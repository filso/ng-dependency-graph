/**
 * Loads the browser globals (jQuery, AngularJS, angular-mocks) and all app
 * scripts, in the same order as app/index.html. The app scripts are plain
 * scripts, not modules — they register themselves on the global `angular`.
 */

// angular-mocks only exposes window.module / window.inject when it detects
// a jasmine-flavoured runner.
window.jasmine = window.jasmine || {};

await import('../app/vendor/jquery-2.1.1.min.js');
await import('../app/vendor/angular.js');

// angular-mocks relies on jasmine's shared `this` context between
// beforeEach/afterEach hooks; vitest hooks have no `this`. Bridge it with
// a per-test context object while angular-mocks registers its hooks.
const origBeforeEach = window.beforeEach;
const origAfterEach = window.afterEach;
let specContext = {};
origBeforeEach(() => {
  specContext = {};
});
window.beforeEach = (fn) =>
  origBeforeEach(function () {
    return fn.call(specContext);
  });
window.afterEach = (fn) =>
  origAfterEach(function () {
    return fn.call(specContext);
  });
await import('./vendor/angular-mocks.js');
window.beforeEach = origBeforeEach;
window.afterEach = origAfterEach;

await import('../app/scripts/app.module.js');
await import('../app/scripts/util/util.js');
await import('../app/scripts/core/Const.js');
await import('../app/scripts/core/chromeExtension.js');
await import('../app/scripts/core/appContext.js');
await import('../app/scripts/core/inspectedApp.js');
await import('../app/scripts/core/currentView.js');
await import('../app/scripts/core/storage.js');
await import('../app/scripts/core/nodeFactory.js');
await import('../app/scripts/core/Graph.js');
await import('../app/scripts/models/Node.js');
await import('../app/scripts/models/Module.js');
await import('../app/scripts/models/Component.js');
await import('../app/scripts/about/sampleAppData.js');
