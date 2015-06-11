var inject = function() {

  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }

  document.head.appendChild((function() {

    var fn = function bootstrap(window) {

      function disablePlugin(reason) {
        console.log(arguments);
        console.log(reason);
      }

      var angular = window.angular;

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
          // TODO: var name
          var areWeThereYet = function(ev) {

            if (ev.srcElement.tagName === 'SCRIPT') {
              console.log(ev.srcElement);
              var oldOnload = ev.srcElement.onload;
              ev.srcElement.onload = function() {
                if (ngLoaded()) {

                  document.removeEventListener('DOMNodeInserted', areWeThereYet);
                  bootstrap(window);
                }
                if (oldOnload) {
                  oldOnload.apply(this, arguments);
                }
              };
            }
          };
          document.addEventListener('DOMNodeInserted', areWeThereYet);
        }());
        return;
      }

      // do not patch twice
      if (window.__ngDependencyGraph) {
        return;
      }


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
              (arg && typeof arg == 'object' ? arg.constructor.name || 'Object' : typeof arg));
            return arg;
          }

          return function(fn) {
            var $inject,
              fnText,
              argDecl,
              last;

            if (typeof fn == 'function') {
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
              console.log('ble!');
              console.log(fn);

              assertArgFn(fn, 'fn', true);
            }
            return $inject;
          };
        }());
      }

      var api = window.__ngDependencyGraph = {
        getMetadata: function() {
          return metadata;
        }
      };

      var metadata = {
        angularVersion: null,
        apps: [],
        modules: []
      };

      angular.forEach(document.querySelectorAll('[ng-app]'),
        function(elm) {
          var appName = elm.getAttribute('ng-app');
          if (metadata.apps.indexOf(appName) === -1) {
            console.log(appName);
            metadata.apps.push(appName);
            createModule(appName);
          }
        });

      function createModule(name) {
        var exist = _.find(metadata.modules, {name: name});
        if (exist || name === undefined) return;

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

      function addDeps(moduleData, name, fn, type) {
        if (fn.constructor !== Function) {
          moduleData.components.push({
            name: name,
            type: type
          });
        } else {
          moduleData.components.push({
            name: name,
            deps: annotate(fn),
            type: type
          });
        }
      }


      function processModule(moduleData) {
        var moduleName = moduleData.name;
        console.log('Processing: ' + moduleName);
        var module = angular.module(moduleName);

        angular.forEach(module._invokeQueue, function(item) {
          var compArgs = item[2];
          if (typeof item[2][1] == 'string') {
            debugger;
          }
          switch (item[0]) {
            case '$provide':
              switch (item[1]) {
                case 'value':
                  addDeps(moduleData, compArgs[0], compArgs[1], 'value');
                  addDeps(moduleData, compArgs[0], compArgs[1], 'constant');
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
              if (compArgs[1].constructor === Object) {
                angular.forEach(compArgs[1], function(key, value) {
                  addDeps(moduleData, key, value, 'directive');
                });
              }

              addDeps(moduleData, compArgs[0], compArgs[1], 'directive');
              break;
            default:
              disablePlugin('unknown dendency type', item[0]);
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

// first sniff out 
// inject();


// only inject if cookie is set
// if (document.cookie.indexOf('__ngDependencyGraph=true') != -1) {
document.addEventListener('DOMContentLoaded', inject);
// }
