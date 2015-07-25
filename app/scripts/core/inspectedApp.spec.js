'use strict';

describe('inspectedApp', function() {

  var data = {
    apps: new Object()
  };
  var returnedData;

  var $timeout;
  var inspectedApp;
  var chromeExtension = {
    isExtensionContext: function() {
      return true;
    },
    eval: function(injectedFn, callback) {
      callback(returnedData);
    }
  };

  beforeEach(module('ngDependencyGraph'));

  beforeEach(module(function($provide) {
    $provide.value('chromeExtension', chromeExtension);
  }));

  beforeEach(inject(function(_inspectedApp_, _$timeout_) {
    inspectedApp = _inspectedApp_;
    $timeout = _$timeout_;
  }));

  describe('.loadInspectedAppData()', function() {

    it('polls for injected data', function() {
      var promise = inspectedApp.loadInspectedAppData();

      expect(promise.$$state.status).toEqual(0);
      $timeout.flush(2000);
      expect(promise.$$state.status).toEqual(0);
      // after 2 seconds load app
      returnedData = data;
      $timeout.flush(3000);

      expect(promise.$$state.status).toEqual(1);
      expect(promise.$$state.value).toBe(data);

    });

  });


});
