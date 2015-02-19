var inject = function() {
  document.head.appendChild((function() {

    var fn = function bootstrap(window) {

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
      };

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
      if (window.__ngArchitecture) {
        return;
      }

      
      // helper to extract dependencies from function arguments
      // not all versions of AngularJS expose annotate
      var annotate = angular.injector().annotate;
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
              assertArgFn(fn, 'fn', true);
            }
            return $inject;
          };
        }());
      }

      var api = window.__ngArchitecture = {
        getDeps: function() {
          return debug.deps;
        }
      };


      // Private state
      // =============

      //var bootstrap = window.angular.bootstrap;
      var debug = {
        // map of scopes --> watcher function name strings
        watchers: {},
        deps: []
      };

      function addDeps(name, fn, type) {
        if (type === 'controller') {}
        debug.deps.push({
          name: name,
          imports: annotate(fn)
        });
      }

      function addModuleDeps(name, deps) {
          console.log(name, deps);
      }
      var origModule = angular.module;
      angular.module = function(name, deps) {
        if (typeof deps !== 'undefined') {
          addModuleDeps(name, deps);
        }
        return origModule.apply(this, arguments);
      };


      var ng = angular.module('ng');
      ng.config(function($provide, $compileProvider, $controllerProvider) {
        // Patch $provide.(provider|factory|service) functions 
        var origProviderFn = $provide.provider,
          origGet;
        $provide.provider = function(name, definition) {
          if (!definition) {
            angular.forEach(name, function(definition, name) {
              var origGet = definition.$get;
              definition.$get = function() {
                addDeps(name, origGet);
                return origGet.apply(this, arguments);
              };
            });
          } else if (definition instanceof Array) {
            // it is a constructoctor with array syntax
            var tempConstructor = definition[definition.length - 1];

            definition[definition.length - 1] = function() {
              addDeps(name, tempConstructor);
              return tempConstructor.apply(this, arguments);
            };
          } else if (definition.$get instanceof Array) {
            // it should have a $get
            origGet = definition.$get[definition.$get.length - 1];

            definition.$get[definition.$get.length - 1] = function() {
              addDeps(name, origGet);


              return origGet.apply(this, arguments);
            };
          } else if (typeof definition === 'object') {
            // it should have a $get
            origGet = definition.$get;

            // preserve original annotations
            definition.$get = annotate(definition.$get);
            definition.$get.push(function() {
              addDeps(name, origGet);
              return origGet.apply(this, arguments);
            });
          } else {
            addDeps(name, definition);
          }
          return origProviderFn.apply(this, arguments);
        };


        (function() {
          var origFn = $compileProvider.directive;
          $compileProvider.directive = function(name, definition) {
            if (typeof name === 'object') {
              angular.forEach(name, function(value, key) {
                name[key] = function() {
                  addDeps(key, value, 'directive');
                  return value.apply(this, arguments);
                };
              });
            } else {
              addDeps(name, definition, 'directive');
            }
            return origFn.apply(this, arguments);
          };

        })();

        (function() {
          var origFn = $controllerProvider.register;
          $controllerProvider.register = function(name, definition) {
            if (typeof name === 'object') {
              angular.forEach(name, function(value, key) {
                name[key] = function() {
                  addDeps(key, value, 'controller');
                  return value.apply(this, arguments);
                };
              });
            } else {
              addDeps(name, definition, 'controller');
            }
            return origFn.apply(this, arguments);
          };

        })();



        ['factory', 'service'].forEach(function(met) {
          var origFn = $provide[met];
          $provide[met] = function(name, definition) {
            // console.log(name, definition);

            if (typeof name === 'object') {
              angular.forEach(name, function(value, key) {
                name[key] = function() {
                  addDeps(key, value);
                  return value.apply(this, arguments);
                };
              });
            } else {
              addDeps(name, definition);
            }
            // if (/clEvents/.test(name)) {
            //   debugger;
            // }
            return origFn.apply(this, arguments);
          };
        });
      });
    };

    // Return a script element with the above code embedded in it
    var script = window.document.createElement('script');
    script.innerHTML = '(' + fn.toString() + '(window))';

    return script;
  }()));
};

// first sniff out 
inject();


// only inject if cookie is set
// if (document.cookie.indexOf('__ngArchitecture=true') != -1) {
  document.addEventListener('DOMContentLoaded', inject);
// }
