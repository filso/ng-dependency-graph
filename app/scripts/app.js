angular.module('app', [])
  .run(function($rootScope, dev) {

    dev.exposeGlobalObject();

    setInterval(function() {
      $rootScope.$broadcast('poll');
    }, 500);


  });