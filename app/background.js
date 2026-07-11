// notify of page refreshes
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (msg.action === 'register') {
      var respond = function (tabId, changeInfo, tab) {
        if (tabId !== msg.inspectedTabId) {
          return;
        }
        port.postMessage({ action: 'refresh', changeInfo: changeInfo });
      };

      chrome.tabs.onUpdated.addListener(respond);
      port.onDisconnect.addListener(function () {
        chrome.tabs.onUpdated.removeListener(respond);
      });
    }
  });
});
