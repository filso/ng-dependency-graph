// Google Analytics for Chrome Extensions (Manifest V3 compatible)
// Using Measurement Protocol for tracking
(function() {
  'use strict';
  
  var GA_MEASUREMENT_ID = 'UA-65840547-1';
  var GA_ENDPOINT = 'https://www.google-analytics.com/collect';
  
  // Create a simple analytics wrapper
  window.ga = function() {
    var args = Array.prototype.slice.call(arguments);
    var command = args[0];
    
    if (command === 'create' || command === 'set' || command === 'require') {
      // Configuration commands - no-op for now
      return;
    }
    
    if (command === 'send') {
      var hitType = args[1];
      var page = args[2];
      
      // Send analytics via fetch API (Manifest V3 compatible)
      var params = new URLSearchParams({
        v: '1',
        tid: GA_MEASUREMENT_ID,
        cid: getClientId(),
        t: hitType || 'pageview',
        dp: page || window.location.pathname
      });
      
      fetch(GA_ENDPOINT + '?' + params.toString(), {
        method: 'POST',
        mode: 'no-cors'
      }).catch(function(err) {
        // Silently fail if analytics can't be sent
        console.debug('Analytics error:', err);
      });
    }
  };
  
  // Generate or retrieve a client ID
  function getClientId() {
    var clientId = localStorage.getItem('ga_client_id');
    if (!clientId) {
      clientId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('ga_client_id', clientId);
    }
    return clientId;
  }
  
  // Initialize
  ga('create', 'UA-65840547-1', 'auto');
  ga('set', 'checkProtocolTask', function(){});
  ga('require', 'displayfeatures');
  ga('send', 'pageview', '/index.html');
})();