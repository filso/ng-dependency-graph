'use strict';

/* global $0 */
var panels = chrome.devtools.panels;

// Executed in the context of the inspected page ($0 is the selected element).
var getPanelContents = function () {
  if (!window.angular || !$0) {
    return {};
  }

  var scope = window.angular.element($0).scope();
  // Export $scope to the console as well
  window.$scope = scope;

  var panelContents = {
    __private__: {},
  };

  for (var prop in scope) {
    if (Object.prototype.hasOwnProperty.call(scope, prop)) {
      if (prop.substr(0, 2) === '$$') {
        panelContents.__private__[prop] = scope[prop];
      } else {
        panelContents[prop] = scope[prop];
      }
    }
  }

  return panelContents;
};

panels.elements.createSidebarPane('AngularJS Scope', function (sidebar) {
  panels.elements.onSelectionChanged.addListener(function updateElementProperties() {
    sidebar.setExpression('(' + getPanelContents.toString() + ')()');
  });
});

panels.create('AngularJS Graph', 'app/img/angular.png', 'app/index.html');
