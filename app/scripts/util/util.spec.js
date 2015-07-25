// TODO: fix these tests
xdescribe('util', function() {

  var util;

  beforeEach(module('ngDependencyGraph'));

  beforeEach(function(_util_) {
    util = _util_;
  });

  it('extractMasks()', function() {
    var str = util.extractMasks('ble , ba  , bom');
    console.log(str);
  });

  it('wildcardToRegexp', function() {
    var str = util.wildcardToRegexp('*ng-temp*');

  });

});