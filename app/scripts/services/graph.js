angular.module('app')
  .factory('Graph', function() {

    function Graph(links, nodes) {
      this.links = links;
      this.nodes = nodes;
    }

    return Graph;

  });
