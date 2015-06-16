'use strict';

angular.module('ngDependencyGraph')
  .directive('dgSearchNode', function(currentView, Const) {

    return {
      scope: true,
      link: function(scope, elm) {

        var allNodes;

        function updateNodes() {
          allNodes = currentView.modulesGraph.nodes.concat(currentView.componentsGraph.nodes);
        }

        function findMatches(q, cb) {
          var substrRegex = new RegExp(q, 'i');
          var arr = _.filter(allNodes, function(node) {
            return substrRegex.test(node.name);
          });
          cb(arr);
        }

        function suggestionTemplateFn(node) {
          return '<div class="' + node.type + '">' + node.name + '<span class="type">' + node.type + '</span></div>';
        }

        scope.$on(Const.Events.UPDATE_GRAPH, function() {
          updateNodes();
        });

        updateNodes();

        var inputElm = $('input', elm);

        inputElm.typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        },
        {
          display: 'name',
          source: findMatches,
          templates: {
            suggestion: suggestionTemplateFn
          }
        });

        inputElm.bind('typeahead:select', function(ev, node) {
          currentView.chooseNode(node);
        });


      }
    };


  });
