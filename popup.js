document.getElementById('getTabTitle').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        document.getElementById('tabTitle').textContent = "Tab title is \"" + tab.title + "\"";
    });
});
