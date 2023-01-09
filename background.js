
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.msg == 'dmchange'){
      toggleDarkMode(request.darkmode, request.tab);
      sendResponse({success: true});
    }
    if(request.msg == 'olaz'){
      toggleDarkMode(request.darkmode, sender.tab);
      sendResponse({success: true});
    }
  }
  );



async function toggleDarkMode(darkmode, tab){
  const nextState = darkmode ? 'ON': 'OFF';

    // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
    await chrome.scripting.insertCSS({
      files: ["dark-mode.css"],
      target: { tabId: tab.id},
    });
  } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
    await chrome.scripting.removeCSS({
      files: ["dark-mode.css"],
      target: { tabId: tab.id},
    });
  }
}

