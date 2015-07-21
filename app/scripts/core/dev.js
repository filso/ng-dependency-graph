'use strict';

angular.module('ngDependencyGraph')
  .factory('dev', function($rootScope, $window, $q) {

    var countWatchers = function() {
      var target = $rootScope,
        current = target,
        next;
      var watchers = 0;
      do {
        watchers += current.$$watchers && current.$$watchers.length;
        if (!(next = (current.$$childHead || (current !== target && current.$$nextSibling)))) {
          while (current !== target && !(next = current.$$nextSibling)) {
            current = current.$parent;
          }
        }
      } while ((current = next));
      return watchers;
    };

    var groupCountWatchers = function() {
      var target = $rootScope,
        current = target,
        next,
        groups = {};
      var watchers = 0;
      do {
        watchers += current.$$watchers && current.$$watchers.length;
        _.each(current.$$watchers, function(w) {
          if (_.isString(w.exp)) {
            groups[w.exp] = groups[w.exp] || 0;
            groups[w.exp] += 1;
          }
        });
        if (!(next = (current.$$childHead || (current !== target && current.$$nextSibling)))) {
          while (current !== target && !(next = current.$$nextSibling)) {
            current = current.$parent;
          }
        }
      } while ((current = next));

      return groups;
    };

    function consoleRun(fnName, prefix) {
      return function(id) {
        if (console[fnName]) {
          console[fnName](prefix + ' ' + id);
        }
      };
    }


    var service = {
      profile: consoleRun('profile', ''),
      profileEnd: consoleRun('profileEnd', ''),
      time: consoleRun('time', 'Time: '),
      timeEnd: consoleRun('timeEnd', 'Time: '),
      gwc: function() {
        console.log('Group count watchers', groupCountWatchers());
      },
      wc: function() {
        console.log('Watchers: ' + countWatchers());
      },
      startLoggingWatchers: function() {

        setInterval(function() {
          service.logWatchersCount();
        }, 3000);

      },
      waitForAngular: function() {
        var deferred = $q.defer();

        angular.element($('body')).injector().get('$browser')
          .notifyWhenNoOutstandingRequests(deferred.resolve);

        return deferred.promise;
      },
      getService: function(name) {
        return angular.element($('body')).injector().get(name);
      },
      exposeGlobalObject: function() {
        // yes, make it global!
        $window.dev = this;
      },
      clog: function(val) {
          var message = JSON.stringify(val).replace(/n/g, " ");
          chrome.tabs.sendRequest(tabId,
              {"type": "consoleLog", "value": message});
      }
    };

    return service;
  });
