angular.module('app')
  .factory('componentFactory', function(Component, Service, Controller, Directive) {


    function createComponents(rawNodes) {

      // debugger;

      var nodes = _.map(rawNodes, function(rawNode) {
        switch (rawNode.type) {
          case 'service':
            return new Component(rawNode);
          case 'controller':
            return new Controller(rawNode);
          default:
            return new Component(rawNode);
        }
      });

      _.each(nodes, function(node1) {


        var node1Deps = _.filter(nodes, function(item) {
          return _.contains(node1._data.deps, item._data.name);
        });


        _.each(node1Deps, function(node2) {
          node1.linkDep(node2);
          node2.linkProvides(node1);
        });

      });
      return nodes;

    }

    return {
      createComponents: createComponents
    };
  });
