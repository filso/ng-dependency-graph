describe('currentView', () => {
  let currentView, Graph, Const, $rootScope;

  const rawModules = [
    { name: 'app', type: 'module', deps: ['ngLocale', 'ui.router'] },
    { name: 'ngLocale', type: 'module', deps: [] },
    { name: 'ui.router', type: 'module', deps: [] },
  ];

  beforeEach(window.module('ngDependencyGraph'));
  beforeEach(inject(function (_currentView_, _Graph_, _Const_, _$rootScope_) {
    currentView = _currentView_;
    Graph = _Graph_;
    Const = _Const_;
    $rootScope = _$rootScope_;
  }));

  function setGraphsFromRaw() {
    const modulesGraph = Graph.createFromRawNodes(rawModules, Const.Scope.MODULES);
    const componentsGraph = Graph.createFromRawNodes([], Const.Scope.COMPONENTS);
    currentView.setGraphs(modulesGraph, componentsGraph);
  }

  it('applies the default ignore mask (ngLocale, ui.*)', () => {
    setGraphsFromRaw();
    currentView._applyFilters();

    expect(currentView.graph.nodes.map((n) => n.name)).toEqual(['app']);
  });

  it('applies user filter masks', () => {
    setGraphsFromRaw();
    currentView.filters.ignoreModules = '';
    currentView.filters.filterModules = 'ui.*';
    currentView._applyFilters();

    expect(currentView.graph.nodes.map((n) => n.name)).toEqual(['ui.router']);
  });

  it('chooseNode() selects the node, switches scope and broadcasts', () => {
    setGraphsFromRaw();
    currentView._applyFilters();

    const events = [];
    $rootScope.$on(Const.Events.CHOOSE_NODE, (_ev, node) => events.push(node));

    const appNode = currentView.modulesGraph.nodes[0];
    currentView.chooseNode(appNode);

    expect(currentView.selectedNode).toBe(appNode);
    expect(currentView.scope).toBe(Const.Scope.MODULES);
    expect(events).toEqual([appNode]);
  });
});
