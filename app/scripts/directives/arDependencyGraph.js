angular.module('app')
  .directive('arDependencyGraph', function() {

    return {
      link: function(scope, elm, attrs) {
        d3.select(elm[0])
          .append('svg')
          .selectAll('');
      }

    };


  });
