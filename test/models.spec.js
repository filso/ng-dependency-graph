describe('models', () => {
  let Node, Module, Component;

  beforeEach(window.module('ngDependencyGraph'));
  beforeEach(inject(function (_Node_, _Module_, _Component_) {
    Node = _Node_;
    Module = _Module_;
    Component = _Component_;
  }));

  it('Node keeps name, type and raw data, with a unique id', () => {
    const a = new Node({ name: 'a', type: 'service' });
    const b = new Node({ name: 'b', type: 'controller' });

    expect(a.name).toBe('a');
    expect(a.type).toBe('service');
    expect(a._id).not.toBe(b._id);
    expect(a.deps).toEqual([]);
    expect(a.provides).toEqual([]);
  });

  it('Node links and resets dependencies', () => {
    const a = new Node({ name: 'a' });
    const b = new Node({ name: 'b' });

    a.linkDep(b);
    b.linkProvides(a);
    expect(a.deps).toEqual([b]);
    expect(b.provides).toEqual([a]);

    a.resetLinks();
    expect(a.deps).toEqual([]);
    expect(a.provides).toEqual([]);
  });

  it('Module and Component are Nodes distinguished by isModule', () => {
    const mod = new Module({ name: 'app', type: 'module' });
    const com = new Component({ name: 'svc', type: 'service' });

    expect(mod).toBeInstanceOf(Node);
    expect(com).toBeInstanceOf(Node);
    expect(mod.isModule).toBe(true);
    expect(com.isModule).toBe(false);
  });
});

describe('nodeFactory + Graph', () => {
  let Graph;

  const rawNodes = [
    { name: 'app', type: 'module', deps: ['mod1', 'mod2'] },
    { name: 'mod1', type: 'module', deps: [] },
    { name: 'mod2', type: 'module', deps: ['mod1'] },
  ];

  beforeEach(window.module('ngDependencyGraph'));
  beforeEach(inject(function (_Graph_) {
    Graph = _Graph_;
  }));

  it('creates nodes and links from raw metadata', () => {
    const graph = Graph.createFromRawNodes(rawNodes, 'modules');

    expect(graph.nodes.map((n) => n.name)).toEqual(['app', 'mod1', 'mod2']);
    expect(graph.links).toHaveLength(3); // app->mod1, app->mod2, mod2->mod1

    const app = graph.nodes[0];
    expect(app.deps.map((n) => n.name).sort()).toEqual(['mod1', 'mod2']);
    const mod1 = graph.nodes[1];
    expect(mod1.provides.map((n) => n.name).sort()).toEqual(['app', 'mod2']);
  });

  it('reuses nodes from the old graph so D3 keeps positions', () => {
    const oldGraph = Graph.createFromRawNodes(rawNodes, 'modules');
    const newGraph = Graph.createFromRawNodes(
      [...rawNodes, { name: 'mod3', type: 'module', deps: [] }],
      'modules',
      oldGraph,
    );

    expect(newGraph.nodes[0]).toBe(oldGraph.nodes[0]);
    expect(newGraph.nodes).toHaveLength(4);
  });

  it('filterNodes() drops nodes and their links, resetFilter() restores them', () => {
    const graph = Graph.createFromRawNodes(rawNodes, 'modules');

    graph.filterNodes((node) => node.name !== 'mod1');
    expect(graph.nodes.map((n) => n.name)).toEqual(['app', 'mod2']);
    expect(graph.links).toHaveLength(1); // only app->mod2 survives

    graph.resetFilter();
    expect(graph.nodes).toHaveLength(3);
    expect(graph.links).toHaveLength(3);
  });

  it('filterByName() matches case-insensitive substrings', () => {
    const graph = Graph.createFromRawNodes(rawNodes, 'modules');
    graph.filterByName('MOD');
    expect(graph.nodes.map((n) => n.name)).toEqual(['mod1', 'mod2']);
  });
});
