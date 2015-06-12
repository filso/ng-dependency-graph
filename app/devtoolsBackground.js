var panels = chrome.devtools.panels;

panels.create(
  "ng-dependency-graph",
  "app/img/angular.png",
  "app/index.html"
);
