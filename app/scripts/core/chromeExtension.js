'use strict';

// Abstraction layer over Chrome DevTools extension APIs.
angular.module('ngDependencyGraph').value('chromeExtension', {
  isExtensionContext() {
    return window.chrome !== undefined && window.chrome.runtime !== undefined;
  },

  /**
   * Runs `fn(window, args)` in the context of the inspected page.
   * Nicer API than passing code strings to chrome.devtools.inspectedWindow.eval.
   */
  eval(fn, args, cb) {
    if (!cb && typeof args === 'function') {
      cb = args;
      args = {};
    } else if (!args) {
      args = {};
    }
    chrome.devtools.inspectedWindow.eval('(' + fn.toString() + '(window, ' + JSON.stringify(args) + '));', cb);
  },
});
