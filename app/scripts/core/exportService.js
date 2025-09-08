'use strict';

angular.module('ngDependencyGraph')
  .factory('exportService', function(currentView) {

    var service = {
      
      /**
       * Export the current graph data as JSON
       * @returns {string} JSON string representation of the graph
       */
      exportGraphAsJson: function() {
        var exportData = this.prepareExportData();
        return JSON.stringify(exportData, null, 2);
      },

      /**
       * Prepare the data structure for export
       * @returns {object} Object containing graph data and metadata
       */
      prepareExportData: function() {
        var graph = currentView.graph;
        if (!graph) {
          throw new Error('No graph data available for export');
        }

        // Create a clean copy of nodes without circular references
        var cleanNodes = _.map(graph.nodes, function(node) {
          return {
            id: node._id,
            name: node.name,
            type: node.type,
            isModule: node.isModule,
            // Include module information for components
            module: node.module ? {
              name: node.module.name,
              id: node.module._id
            } : undefined,
            // Include dependency information
            dependencies: _.map(node.deps, function(dep) {
              return {
                name: dep.name,
                id: dep._id,
                type: dep.type
              };
            }),
            dependents: _.map(node.provides, function(dependent) {
              return {
                name: dependent.name,
                id: dependent._id,
                type: dependent.type
              };
            }),
            // Include position information if available
            position: node.x && node.y ? {
              x: node.x,
              y: node.y,
              fixed: !!node.fixed
            } : undefined,
            // Include component type information for modules
            componentsByType: node.componentsByType ? _.mapValues(node.componentsByType, function(components) {
              return _.map(components, function(component) {
                return {
                  name: component.name,
                  id: component._id,
                  type: component.type
                };
              });
            }) : undefined
          };
        });

        // Create a clean copy of links
        var cleanLinks = _.map(graph.links, function(link) {
          return {
            id: link._id,
            source: {
              name: link.source.name,
              id: link.source._id,
              type: link.source.type
            },
            target: {
              name: link.target.name,
              id: link.target._id,
              type: link.target.type
            }
          };
        });

        // Create the export data structure
        var exportData = {
          metadata: {
            exportedAt: new Date().toISOString(),
            exportVersion: '1.0.0',
            scope: currentView.scope,
            totalNodes: cleanNodes.length,
            totalLinks: cleanLinks.length
          },
          currentView: {
            scope: currentView.scope,
            filters: {
              filterModules: currentView.filters.filterModules,
              ignoreModules: currentView.filters.ignoreModules,
              componentsVisible: currentView.filters.componentsVisible
            },
            options: {
              stickyNodesEnabled: currentView.options.stickyNodesEnabled
            },
            selectedNode: currentView.selectedNode ? {
              name: currentView.selectedNode.name,
              id: currentView.selectedNode._id,
              type: currentView.selectedNode.type
            } : undefined
          },
          graph: {
            scope: graph.scope,
            nodes: cleanNodes,
            links: cleanLinks
          }
        };

        return exportData;
      },

      /**
       * Download the JSON data as a file
       * @param {string} jsonData - JSON string to download
       * @param {string} filename - Optional filename
       */
      downloadJson: function(jsonData, filename) {
        filename = filename || 'ng-dependency-graph-' + new Date().toISOString().slice(0, 19).replace(/:/g, '-') + '.json';
        
        var blob = new Blob([jsonData], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        
        // Create a temporary link element to trigger download
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
      }

    };

    return service;

  });