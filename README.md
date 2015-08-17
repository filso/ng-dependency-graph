## AngularJS dependency graph

AngularJS dependency graph browser.
Implemented as a [Chrome extension](https://chrome.google.com/webstore/detail/angularjs-dependency-grap/gghbihjmlhobaiedlbhcaellinkmlogj). Once you install the extension, you can access the graph in Chrome inspector panel.

http://angularjs-graph.org

## Installing from Chrome web store
https://chrome.google.com/webstore/detail/angularjs-dependency-grap/gghbihjmlhobaiedlbhcaellinkmlogj

### Installing from Source - development version

1.  Clone the repository: `git clone git://github.com/filso/ng-dependency-graph`
2.  Navigate to `chrome://chrome/extensions/` and enable Developer Mode.
3.  Choose "Load unpacked extension"
4.  Open the directory you just cloned (should open with Chrome, otherwise try dragging/dropping the file into Chrome) and follow the prompts to install.

### Features
- components and modules view
- update graph on reload
- ignore and filter modules
- sticky nodes
- zooming and panning
- filtering by component type
- works for apps loaded asynchronously (`angular.bootstrap`)

### Other
This app uses semantic versioning: http://semver.org/
