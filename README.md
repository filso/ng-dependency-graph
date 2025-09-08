## AngularJS dependency graph

[![Join the chat at https://gitter.im/filso/ng-dependency-graph](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/filso/ng-dependency-graph?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
- **export graph data as JSON** - Export the current dependency graph and view state as a JSON file for further analysis

### JSON Export
The extension now supports exporting the dependency graph data as a JSON file. Click the "Export as JSON" button in the Options section to download a file containing:

- **Graph data**: All nodes (modules/components) with their dependencies and relationships
- **Current view state**: Active filters, scope (modules/components), and selected node
- **Metadata**: Export timestamp, version, and graph statistics
- **Node positions**: Current layout positions for recreation of the visual state

The exported JSON can be used for:
- Data analysis and processing with external tools
- Backup of current graph state
- Integration with other development workflows
- Documentation and reporting purposes

### Other
This app uses semantic versioning: http://semver.org/
