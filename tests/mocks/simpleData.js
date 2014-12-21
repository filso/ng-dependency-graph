var rawMockData = rawMockData || {};

rawMockData.simple = {
  angularVersion: 'bleble',
  apps: ['app'],
  modules: [{
      name: 'app',
      deps: ['mod1', 'mod2'],
      components: [{
          name: 'comp1',
          deps: ['dep1', 'dep2'],
          type: 'controller'
        }, {
          name: 'dir1',
          deps: ['dep3', 'dep2'],
          type: 'directive'
        },
      ]
    }
  ]
};
