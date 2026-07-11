'use strict';

angular.module('ngDependencyGraph').factory('util', function () {
  let idCounter = 0;

  const util = {
    uniqueId() {
      return ++idCounter;
    },

    /**
     * Turns a comma/semicolon separated list of wildcard patterns
     * (e.g. "ngLocale, ui.*") into an array of RegExps.
     */
    extractMasks(str) {
      return str.split(/[,;]/g).map((s) => util.wildcardToRegexp(s.trim()));
    },

    wildcardToRegexp(str) {
      return new RegExp('^' + str.replace(/[*]/g, '.*') + '$');
    },

    debounce(fn, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
      };
    },

    // Leading + trailing throttle: fires immediately, then at most once per `wait`.
    throttle(fn, wait) {
      let cooldown = null;
      let pendingArgs = null;
      return function (...args) {
        if (cooldown) {
          pendingArgs = args;
          return;
        }
        fn.apply(this, args);
        cooldown = setTimeout(() => {
          cooldown = null;
          if (pendingArgs) {
            const trailing = pendingArgs;
            pendingArgs = null;
            fn.apply(this, trailing);
          }
        }, wait);
      };
    },
  };

  return util;
});
