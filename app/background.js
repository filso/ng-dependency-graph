// notify of page refreshes
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (msg.action === "register") {
      var respond = function (tabId, changeInfo, tab) {
        if (tabId !== msg.inspectedTabId) {
          return;
        }
        port.postMessage({ action: "refresh", changeInfo: changeInfo });
      };

      chrome.tabs.onUpdated.addListener(respond);
      port.onDisconnect.addListener(function () {
        chrome.tabs.onUpdated.removeListener(respond);
      });
    }
  });
});

// handle runtime messages for other functionality
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // This handles any sendMessage calls from content scripts or devtools
  // Currently just acknowledging the message
  if (sendResponse) {
    sendResponse({});
  }
});
