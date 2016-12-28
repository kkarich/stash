// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({});
});
// A generic onclick callback function.
function stashIt(info, tab) {
    console.log(info, tab)
    // Get the list of items stored today
    chrome.storage.sync.get('stashList', function (data) {
        // init stash Object to add to saved stash list
        var todaysDateTime = moment().format();
        var stashObject = { 'url': info.pageUrl, text: info.selectionText, datetime: todaysDateTime };

        // init empty stash list
        var stashList = [];
        // if data exists and has a valid stash list property, Use that value instead of the empty array
        if (data && Array.isArray(data['stashList'])) {
            stashList = data['stashList'];
        }

        // Update list to include new stash object
        stashList.push(stashObject);

        // Save updated stash list to chrome storage
        chrome.storage.sync.set({stashList:stashList}, function () {
            // Notify that we saved.
            console.log('Stash saved');
        });

    });
}
// settings for right click menu
var context = "selection";
var title = "Stash It";
var id = chrome.contextMenus.create({
    "title": title, "contexts": [context],
    "onclick": stashIt
});

