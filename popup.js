document.getElementById('getTabTitle').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0]
        document.getElementById('tabTitle').textContent = "Tab title is \"" + tab.title + "\"";
    });
});

// Tab title is "active,audible,autoDiscardable,discarded,groupId,height,highlighted,id,incognito,index,lastAccessed,mutedInfo,pinned,selected,status,width,windowId"

