var injectCode = function() {

  document.head.appendChild((function() {
    var fn = function bootstrap(window) {

      function disablePlugin(reason) {
        console.log(arguments);
        console.log(reason);
      }

      // Helper to determine if the root 'ng' module has been loaded
      // window.angular may be available if the app is bootstrapped asynchronously, but 'ng' might
      // finish loading later.
      function ngLoaded() {
        if (!window.angular) {
          return false;
        }
        try {
          window.angular.module('ng');
        } catch (e) {
          return false;
        }
        return true;
      }

      if (!ngLoaded()) {
        (function() {
          var isAngularLoaded = function(ev) {

            if (ev.srcElement.tagName === 'SCRIPT') {
              var oldOnload = ev.srcElement.onload;
              ev.srcElement.onload = function() {
                if (ngLoaded()) {

                  document.removeEventListener('DOMNodeInserted', isAngularLoaded);
                  bootstrap(window);
                }
                if (oldOnload) {
                  oldOnload.apply(this, arguments);
                }
              };
            }
          };
          document.addEventListener('DOMNodeInserted', isAngularLoaded);
        }());
        return;
      }

      // do not patch twice
      if (window.__ngDependencyGraph) {
        return;
      }

      var angular = window.angular;

      // helper to extract dependencies from function arguments
      // not all versions of AngularJS expose annotate
      var annotate; // = angular.injector().annotate;
      if (!annotate) {
        annotate = (function() {

          var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
          var FN_ARG_SPLIT = /,/;
          var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
          var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

          // TODO: should I keep these assertions?
          function assertArg(arg, name, reason) {
            if (!arg) {
              throw new Error("Argument '" + (name || '?') + "' is " + (reason || "required"));
            }
            return arg;
          }

          function assertArgFn(arg, name, acceptArrayAnnotation) {
            if (acceptArrayAnnotation && angular.isArray(arg)) {
              arg = arg[arg.length - 1];
            }

            assertArg(angular.isFunction(arg), name, 'not a function, got ' +
              (arg && typeof arg === 'object' ? arg.constructor.name || 'Object' : typeof arg));
            return arg;
          }

          return function(fn) {
            var $inject,
              fnText,
              argDecl,
              last;

            if (typeof fn === 'function') {
              if (!($inject = fn.$inject)) {
                $inject = [];
                fnText = fn.toString().replace(STRIP_COMMENTS, '');
                argDecl = fnText.match(FN_ARGS);
                argDecl[1].split(FN_ARG_SPLIT).forEach(function(arg) {
                  arg.replace(FN_ARG, function(all, underscore, name) {
                    $inject.push(name);
                  });
                });
                fn.$inject = $inject;
              }
            } else if (angular.isArray(fn)) {
              last = fn.length - 1;
              assertArgFn(fn[last], 'fn');
              $inject = fn.slice(0, last);
            } else {
              assertArgFn(fn, 'fn', true);
            }
            return $inject;
          };
        }());
      }

      var metadata = {
        angularVersion: angular.version,
        apps: [],
        modules: [],
        host: window.location.host
      };

      window.__ngDependencyGraph = {
        getMetadata: function(appNames) {

          appNames.forEach(function(appName) {
            if (metadata.apps.indexOf(appName) === -1) {
              metadata.apps.push(appName);
              createModule(appName);
            }
          });

          return metadata;
        }
      };

      function createModule(name) {
        var exist = false;
        for (var i = 0; i < metadata.modules.length; i++) {
          if (metadata.modules[i].name === name) {
            exist = true;
            break;
          }
        }

        if (exist || name === undefined) {
          return;
        }

        var module = angular.module(name);

        var moduleData = {
          name: name,
          deps: module.requires,
          components: []
        };

        processModule(moduleData);
        metadata.modules.push(moduleData);

        angular.forEach(module.requires, function(mod) {
          createModule(mod);
        });

      }

      function addDeps(moduleData, name, depsSrc, type) {
        if (typeof depsSrc === 'function') {
          moduleData.components.push({
            name: name,
            deps: annotate(depsSrc),
            type: type
          });
          // Array or empty
        } else if (Array.isArray(depsSrc)) {
          var deps = depsSrc.slice();
          deps.pop();
          moduleData.components.push({
            name: name,
            deps: deps,
            type: type
          });
        } else {
          moduleData.components.push({
            name: name,
            type: type
          });
        }
      }


      function processModule(moduleData) {
        var moduleName = moduleData.name;
        var module = angular.module(moduleName);

        // For old versions of AngularJS the property is called 'invokeQueue'
        var invokeQueue = module._invokeQueue || module.invokeQueue;

        angular.forEach(invokeQueue, function(item) {
          var compArgs = item[2];
          switch (item[0]) {
            case '$provide':
              switch (item[1]) {
                case 'value':
                case 'constant':
                  addDeps(moduleData, compArgs[0], compArgs[1], 'value');
                  break;

                default:
                  addDeps(moduleData, compArgs[0], compArgs[1], 'service');
                  break;
              }
              break;

            case '$filterProvider':
              addDeps(moduleData, compArgs[0], compArgs[1], 'filter');
              break;
            case '$animateProvider':
              addDeps(moduleData, compArgs[0], compArgs[1], 'animation');
              break;
            case '$controllerProvider':
              addDeps(moduleData, compArgs[0], compArgs[1], 'controller');
              break;
            case '$compileProvider':
              if (item[1] === 'component') {
                if (compArgs[1].controller) {
                  addDeps(moduleData, compArgs[0], compArgs[1].controller, 'controller');
                } else {
                  addDeps(moduleData, compArgs[0], [], 'controller');
                }
                break;
              }

              if (compArgs[1].constructor === Object) {
                angular.forEach(compArgs[1], function(key, value) {
                  addDeps(moduleData, key, value, 'directive');
                });
              }

              addDeps(moduleData, compArgs[0], compArgs[1], 'directive');
              break;
            case '$injector':
              // invoke, ignore
              break;
            default:
              disablePlugin('unknown dependency type', item[0]);
              break;
          }

        });

      }
    };

    // Return a script element with the above code embedded in it
    var script = window.document.createElement('script');
    script.innerHTML = '(' + fn.toString() + '(window))';

    return script;
  }()));
};

// only inject if cookie is set
if (document.cookie.indexOf('__ngDependencyGraph') !== -1) {
  document.addEventListener('DOMContentLoaded', injectCode);
}
