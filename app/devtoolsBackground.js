var panels = chrome.devtools.panels;


// Angular panel
var angularPanel = panels.create(
  "ng-dependency-graph",
  "app/img/angular.png",
  "app/index.html"
);
