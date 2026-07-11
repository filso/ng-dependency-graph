'use strict';

/**
 * Content script. When the opt-in cookie is set, injects `instrumentPage`
 * into the inspected page, where it exposes AngularJS dependency metadata
 * on `window.__ngDependencyGraph` for the devtools panel to poll.
 */

// Runs in the context of the inspected page (serialized via toString()).
// Must be self-contained: no references to the content script scope.
function instrumentPage(window) {
  var NG_POLL_INTERVAL = 250;
  var NG_POLL_TIMEOUT = 30000;

  // window.angular may exist while the core 'ng' module is still loading
  // (apps bootstrapped asynchronously via angular.bootstrap).
  function ngLoaded() {
    if (!window.angular) {
      return false;
    }
    try {
      window.angular.module('ng');
    } catch {
      return false;
    }
    return true;
  }

  if (!ngLoaded()) {
    // Poll until AngularJS shows up (async bootstrap), then instrument.
    var waited = 0;
    var poll = setInterval(function () {
      waited += NG_POLL_INTERVAL;
      if (ngLoaded()) {
        clearInterval(poll);
        instrumentPage(window);
      } else if (waited >= NG_POLL_TIMEOUT) {
        clearInterval(poll);
      }
    }, NG_POLL_INTERVAL);
    return;
  }

  // do not instrument twice
  if (window.__ngDependencyGraph) {
    return;
  }

  var angular = window.angular;

  // Extract dependency names from a function's arguments or an array
  // annotation. Not all versions of AngularJS expose injector().annotate.
  var annotate = (function () {
    var FN_ARGS = /^function\s*[^(]*\(\s*([^)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;

    return function (fn) {
      var $inject, fnText, argDecl;

      if (typeof fn === 'function') {
        if (!($inject = fn.$inject)) {
          $inject = [];
          fnText = fn.toString().replace(STRIP_COMMENTS, '');
          argDecl = fnText.match(FN_ARGS);
          if (argDecl) {
            argDecl[1].split(FN_ARG_SPLIT).forEach(function (arg) {
              arg.replace(FN_ARG, function (all, underscore, name) {
                $inject.push(name);
              });
            });
          }
          fn.$inject = $inject;
        }
      } else if (Array.isArray(fn)) {
        $inject = fn.slice(0, fn.length - 1);
      } else {
        $inject = [];
      }
      return $inject;
    };
  })();

  var metadata = {
    angularVersion: angular.version,
    apps: [],
    modules: [],
    host: window.location.host,
  };

  window.__ngDependencyGraph = {
    getMetadata: function (appNames) {
      appNames.forEach(function (appName) {
        if (metadata.apps.indexOf(appName) === -1) {
          metadata.apps.push(appName);
          collectModule(appName);
        }
      });

      return metadata;
    },
  };

  function collectModule(name) {
    if (name === undefined) {
      return;
    }
    for (var i = 0; i < metadata.modules.length; i++) {
      if (metadata.modules[i].name === name) {
        return; // already collected
      }
    }

    var module;
    try {
      module = angular.module(name);
    } catch {
      return; // module not registered (yet)
    }

    var moduleData = {
      name: name,
      deps: module.requires,
      components: [],
    };

    collectComponents(moduleData);
    metadata.modules.push(moduleData);

    module.requires.forEach(collectModule);
  }

  function addComponent(moduleData, name, depsSrc, type) {
    if (typeof depsSrc === 'function') {
      moduleData.components.push({ name: name, deps: annotate(depsSrc), type: type });
    } else if (Array.isArray(depsSrc)) {
      moduleData.components.push({ name: name, deps: depsSrc.slice(0, -1), type: type });
    } else {
      moduleData.components.push({ name: name, type: type });
    }
  }

  function collectComponents(moduleData) {
    var module = angular.module(moduleData.name);

    // In old versions of AngularJS the property is called 'invokeQueue'
    var invokeQueue = module._invokeQueue || module.invokeQueue;

    angular.forEach(invokeQueue, function (item) {
      var provider = item[0];
      var method = item[1];
      var compArgs = item[2];

      switch (provider) {
        case '$provide':
          addComponent(
            moduleData,
            compArgs[0],
            compArgs[1],
            method === 'value' || method === 'constant' ? 'value' : 'service',
          );
          break;

        case '$filterProvider':
          addComponent(moduleData, compArgs[0], compArgs[1], 'filter');
          break;

        case '$animateProvider':
          addComponent(moduleData, compArgs[0], compArgs[1], 'animation');
          break;

        case '$controllerProvider':
          addComponent(moduleData, compArgs[0], compArgs[1], 'controller');
          break;

        case '$compileProvider':
          if (method === 'component') {
            addComponent(moduleData, compArgs[0], compArgs[1].controller || [], 'controller');
          } else {
            addComponent(moduleData, compArgs[0], compArgs[1], 'directive');
          }
          break;

        default:
          // $injector.invoke and unknown providers - nothing to collect
          break;
      }
    });
  }
}

function injectInstrumentation() {
  var script = document.createElement('script');
  script.textContent = '(' + instrumentPage.toString() + '(window))';
  document.head.appendChild(script);
  script.remove();
}

// Only instrument pages that opted in via the devtools panel.
if (document.cookie.indexOf('__ngDependencyGraph') !== -1) {
  document.addEventListener('DOMContentLoaded', injectInstrumentation);
}
