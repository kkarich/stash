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
        var stashList = [];
        var todaysDateTime = moment().format();
        var stashObject = { 'url': info.pageUrl, text: info.selectionText, datetime: todaysDateTime };

        // if data exists and todays values are an array set what was in the DB as the stash list
        if (data && Array.isArray(data['stashList'])) {
            stashList = data['stashList'];
        }

        // Update list to include new object
        stashList.push(stashObject);

        // Init empty object, used for adding todays values to DB
        var updateObject = {};
        updateObject['stashList'] = stashList;
        
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set(updateObject, function () {
            // Notify that we saved.
            console.log('Settings saved');
        });

    });
}

var context = "selection";
var title = "Stash It";
var id = chrome.contextMenus.create({
    "title": title, "contexts": [context],
    "onclick": stashIt
});

