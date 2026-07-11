'use strict';

// Typeahead search over all modules and components.
angular.module('ngDependencyGraph').directive('dgSearchNode', function (currentView, Const, $rootScope) {
  return {
    scope: true,
    link(scope, elm) {
      let allNodes;
      const inputElm = $('input', elm);

      function updateNodes() {
        allNodes = currentView.modulesGraph.nodes.concat(currentView.componentsGraph.nodes);
      }

      function findMatches(q, cb) {
        const substrRegex = new RegExp(q, 'i');
        cb(allNodes.filter((node) => substrRegex.test(node.name)));
      }

      function suggestionTemplateFn(node) {
        return '<div class="' + node.type + '">' + node.name + '<span class="type">' + node.type + '</span></div>';
      }

      function clearInput() {
        inputElm.typeahead('val', '');
      }

      scope.$on(Const.Events.UPDATE_GRAPH, updateNodes);
      updateNodes();

      inputElm.typeahead(
        {
          hint: true,
          highlight: true,
          minLength: 1,
        },
        {
          display: 'name',
          source: findMatches,
          templates: {
            suggestion: suggestionTemplateFn,
          },
        },
      );

      inputElm.bind('typeahead:select', function (ev, node) {
        $rootScope.$apply(function () {
          currentView.chooseNode(node, true);
        });
        clearInput();
      });

      inputElm.bind('focus', clearInput);
    },
  };
});
