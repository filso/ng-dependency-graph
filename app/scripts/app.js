angular.module('app', [])
  .run(function($rootScope) {

    setInterval(function() {
      $rootScope.$broadcast('poll');
    }, 500);


  });