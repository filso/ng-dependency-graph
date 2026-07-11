import { readFileSync } from 'node:fs';

/**
 * inject.js is a content script with no exports — load its source and pull
 * out `instrumentPage`, then run it against the real AngularJS loaded in
 * the test environment.
 */
// Vitest runs with the project root as cwd
const src = readFileSync('app/scripts/inject/inject.js', 'utf8');
const instrumentPage = new Function(`${src}; return instrumentPage;`)();

describe('inject.js instrumentPage()', () => {
  beforeEach(() => {
    delete window.__ngDependencyGraph;

    angular.module('testDep', []).factory('depSvc', function () {
      return {};
    });

    angular
      .module('testApp', ['testDep'])
      .controller('TestCtrl', function ($scope, depSvc) {})
      .directive('testDir', [
        'depSvc',
        function (depSvc) {
          return {};
        },
      ])
      .filter('testFilter', function () {
        return (x) => x;
      })
      .constant('TEST_CONST', 1);
  });

  afterEach(() => {
    delete window.__ngDependencyGraph;
  });

  it('exposes __ngDependencyGraph on the page', () => {
    instrumentPage(window);
    expect(window.__ngDependencyGraph).toBeDefined();
    expect(typeof window.__ngDependencyGraph.getMetadata).toBe('function');
  });

  it('does not instrument twice', () => {
    instrumentPage(window);
    const first = window.__ngDependencyGraph;
    instrumentPage(window);
    expect(window.__ngDependencyGraph).toBe(first);
  });

  it('collects modules transitively with their dependencies', () => {
    instrumentPage(window);
    const metadata = window.__ngDependencyGraph.getMetadata(['testApp']);

    expect(metadata.apps).toEqual(['testApp']);
    expect(metadata.angularVersion.full).toBe(angular.version.full);

    const names = metadata.modules.map((m) => m.name);
    expect(names).toContain('testApp');
    expect(names).toContain('testDep');

    const testApp = metadata.modules.find((m) => m.name === 'testApp');
    expect(testApp.deps).toEqual(['testDep']);
  });

  it('extracts components with their dependencies', () => {
    instrumentPage(window);
    const metadata = window.__ngDependencyGraph.getMetadata(['testApp']);
    const testApp = metadata.modules.find((m) => m.name === 'testApp');

    const byName = {};
    testApp.components.forEach((c) => {
      byName[c.name] = c;
    });

    expect(byName.TestCtrl.type).toBe('controller');
    expect(byName.TestCtrl.deps).toEqual(['$scope', 'depSvc']);

    expect(byName.testDir.type).toBe('directive');
    expect(byName.testDir.deps).toEqual(['depSvc']); // array annotation

    expect(byName.testFilter.type).toBe('filter');
    expect(byName.TEST_CONST.type).toBe('value');

    const testDep = metadata.modules.find((m) => m.name === 'testDep');
    expect(testDep.components.map((c) => c.name)).toEqual(['depSvc']);
    expect(testDep.components[0].type).toBe('service');
  });

  it('is idempotent across getMetadata calls', () => {
    instrumentPage(window);
    window.__ngDependencyGraph.getMetadata(['testApp']);
    const metadata = window.__ngDependencyGraph.getMetadata(['testApp']);

    expect(metadata.apps).toEqual(['testApp']);
    expect(metadata.modules.filter((m) => m.name === 'testApp')).toHaveLength(1);
  });
});
