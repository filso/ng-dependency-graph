describe('inspectedApp', () => {
  const data = { apps: ['app'] };
  let returnedData;

  let $timeout;
  let inspectedApp;

  const chromeExtension = {
    isExtensionContext: () => true,
    eval: (injectedFn, appNames, callback) => callback(returnedData),
  };

  beforeEach(window.module('ngDependencyGraph'));

  beforeEach(
    window.module(function ($provide) {
      $provide.value('chromeExtension', chromeExtension);
    }),
  );

  beforeEach(inject(function (_inspectedApp_, _$timeout_) {
    inspectedApp = _inspectedApp_;
    $timeout = _$timeout_;
    returnedData = undefined;
  }));

  describe('loadInspectedAppData()', () => {
    it('polls until the injected script returns data', () => {
      const promise = inspectedApp.loadInspectedAppData(['app']);

      expect(promise.$$state.status).toBe(0); // pending
      $timeout.flush(2000);
      expect(promise.$$state.status).toBe(0); // still pending

      returnedData = data;
      $timeout.flush(3000);

      expect(promise.$$state.status).toBe(1); // resolved
      expect(promise.$$state.value).toBe(data);
      expect(inspectedApp.getData()).toBe(data);
      expect(inspectedApp.waitingForAppData).toBe(false);
    });
  });

  describe('loadSampleData()', () => {
    it('exposes the bundled sample app', () => {
      inspectedApp.loadSampleData();
      const sample = inspectedApp.getData();
      expect(sample.apps.length).toBeGreaterThan(0);
      expect(sample.modules.length).toBeGreaterThan(0);
      expect(inspectedApp.getKey()).toContain(sample.apps[0]);
    });
  });
});
