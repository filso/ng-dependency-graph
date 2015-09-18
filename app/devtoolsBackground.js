var panels = chrome.devtools.panels;

// The function below is executed in the context of the inspected page.

var getPanelContents = function() {
  if (window.angular && $0) {
    //TODO: can we move this scope export into updateElementProperties
    var scope = window.angular.element($0).scope();
    // Export $scope to the console
    window.$scope = scope;
    return (function(scope) {
      var panelContents = {
        __private__: {}
      };

      for (var prop in scope) {
        if (scope.hasOwnProperty(prop)) {
          if (prop.substr(0, 2) === '$$') {
            panelContents.__private__[prop] = scope[prop];
          } else {
            panelContents[prop] = scope[prop];
          }
        }
      }
      // TODO: try running $apply on change in injected window
      // console.log('ok change', panelContents);
      // Object.observe(scope, function(changes) {
      //   console.log('changes', changes);
      // });
      return panelContents;
    }(scope));
  } else {
    return {};
  }
};

panels.elements.createSidebarPane(
  'AngularJS Scope',
  function(sidebar) {
    panels.elements.onSelectionChanged.addListener(function updateElementProperties() {
      sidebar.setExpression('(' + getPanelContents.toString() + ')()');
    });
  });

panels.create(
  'AngularJS Graph',
  'app/img/angular.png',
  'app/index.html'
);
