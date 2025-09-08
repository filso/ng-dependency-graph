'use strict';

describe('exportService', function() {

  beforeEach(module('ngDependencyGraph'));

  var exportService, currentView, mockGraph, mockNode1, mockNode2, mockLink;

  beforeEach(inject(function(_exportService_, _currentView_) {
    exportService = _exportService_;
    currentView = _currentView_;

    // Create mock data
    mockNode1 = {
      _id: 'node1',
      name: 'TestModule',
      type: 'module',
      isModule: true,
      deps: [],
      provides: [],
      x: 100,
      y: 150,
      fixed: false
    };

    mockNode2 = {
      _id: 'node2', 
      name: 'TestService',
      type: 'service',
      isModule: false,
      deps: [mockNode1],
      provides: [],
      module: mockNode1
    };

    mockLink = {
      _id: 'link1',
      source: mockNode2,
      target: mockNode1
    };

    mockGraph = {
      scope: 'components',
      nodes: [mockNode1, mockNode2],
      links: [mockLink]
    };

    // Mock currentView
    currentView.graph = mockGraph;
    currentView.scope = 'components';
    currentView.filters = {
      filterModules: '',
      ignoreModules: '',
      componentsVisible: { service: true, controller: true }
    };
    currentView.options = {
      stickyNodesEnabled: false
    };
    currentView.selectedNode = mockNode1;
  }));

  describe('prepareExportData', function() {
    
    it('should create export data with correct structure', function() {
      var exportData = exportService.prepareExportData();
      
      expect(exportData).toBeDefined();
      expect(exportData.metadata).toBeDefined();
      expect(exportData.currentView).toBeDefined();
      expect(exportData.graph).toBeDefined();
    });

    it('should include metadata with correct properties', function() {
      var exportData = exportService.prepareExportData();
      
      expect(exportData.metadata.exportedAt).toBeDefined();
      expect(exportData.metadata.exportVersion).toBe('1.0.0');
      expect(exportData.metadata.scope).toBe('components');
      expect(exportData.metadata.totalNodes).toBe(2);
      expect(exportData.metadata.totalLinks).toBe(1);
    });

    it('should include current view state', function() {
      var exportData = exportService.prepareExportData();
      
      expect(exportData.currentView.scope).toBe('components');
      expect(exportData.currentView.filters.componentsVisible.service).toBe(true);
      expect(exportData.currentView.options.stickyNodesEnabled).toBe(false);
      expect(exportData.currentView.selectedNode.name).toBe('TestModule');
    });

    it('should include clean node data without circular references', function() {
      var exportData = exportService.prepareExportData();
      
      expect(exportData.graph.nodes.length).toBe(2);
      
      var moduleNode = exportData.graph.nodes[0];
      expect(moduleNode.id).toBe('node1');
      expect(moduleNode.name).toBe('TestModule');
      expect(moduleNode.type).toBe('module');
      expect(moduleNode.isModule).toBe(true);
      expect(moduleNode.position.x).toBe(100);
      expect(moduleNode.position.y).toBe(150);
      expect(moduleNode.position.fixed).toBe(false);

      var serviceNode = exportData.graph.nodes[1];
      expect(serviceNode.id).toBe('node2');
      expect(serviceNode.name).toBe('TestService');
      expect(serviceNode.type).toBe('service');
      expect(serviceNode.isModule).toBe(false);
      expect(serviceNode.module.name).toBe('TestModule');
      expect(serviceNode.module.id).toBe('node1');
    });

    it('should include clean link data', function() {
      var exportData = exportService.prepareExportData();
      
      expect(exportData.graph.links.length).toBe(1);
      
      var link = exportData.graph.links[0];
      expect(link.id).toBe('link1');
      expect(link.source.name).toBe('TestService');
      expect(link.source.id).toBe('node2');
      expect(link.target.name).toBe('TestModule');
      expect(link.target.id).toBe('node1');
    });

    it('should throw error when no graph data available', function() {
      currentView.graph = null;
      
      expect(function() {
        exportService.prepareExportData();
      }).toThrow('No graph data available for export');
    });

  });

  describe('exportGraphAsJson', function() {

    it('should return valid JSON string', function() {
      var jsonString = exportService.exportGraphAsJson();
      
      expect(jsonString).toBeDefined();
      expect(typeof jsonString).toBe('string');
      
      // Should be parseable JSON
      var parsed = JSON.parse(jsonString);
      expect(parsed.metadata).toBeDefined();
      expect(parsed.graph).toBeDefined();
    });

  });

});