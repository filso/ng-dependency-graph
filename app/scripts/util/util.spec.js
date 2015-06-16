describe('util', function() {

  var util;

  beforeEach(module('ngDependencyGraph'));

  beforeEach(function(_util_) {
    util = _util_;
  });

  it('extractMasks()', function() {
    util.extractMasks('ble , ba  , bom');
  });

  iit('wildcardToRegexp', function() {
    // var str = util.wildcardToRegexp('*ng-temp*');

  });
  
});