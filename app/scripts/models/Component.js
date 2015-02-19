angular.module('app')
  .factory('Component', function(Node) {

    function Component(_data) {
      this.name = _data.name;
      this._data = _data;
      this.deps = [];
      this.provides = [];
    }

    Component.prototype = Object.create(Node.prototype);

    _.assign(Component.prototype, {
      linkDep: function(node) {
        this.deps.push(node);
      },
      linkProvides: function(node) {
        this.provides.push(node);
      }
    });

    function createComponents(rawNodes) {

        // debugger;


      var nodes = _.map(rawNodes, function(rawNode) {
        return new Component(rawNode);
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

    Component.createComponents = createComponents;

    return Component;
  });