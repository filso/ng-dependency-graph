angular.module('app')
  .factory('Graph', function() {

    function Graph(rawNodes) {


      var nodes = Component.createComponents(rawNodes);


      window.dev = dev;

      var links = [];

      _.each(nodes, function(node1) {

        _.each(node1.deps, function(node2) {
          links.push({source: node1, target: node2})
        });

      });

      this.links = links;
      this.nodes = nodes;
    }

    return Graph;

  });
