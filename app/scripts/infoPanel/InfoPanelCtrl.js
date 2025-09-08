'use strict';

angular.module('ngDependencyGraph')
  .controller('InfoPanelCtrl', function(exportService) {
    
    var ctrl = this;

    /**
     * Export the current graph as JSON and trigger download
     */
    ctrl.exportGraphAsJson = function() {
      try {
        var jsonData = exportService.exportGraphAsJson();
        exportService.downloadJson(jsonData);
        
        // Send analytics event if available
        if (typeof ga === 'function') {
          ga('send', 'event', 'export', 'action', 'Export JSON');
        }
      } catch (error) {
        console.error('Error exporting graph as JSON:', error);
        // TODO: Show user-friendly error message
        alert('Error exporting graph data. Please try again.');
      }
    };

  });
