
function initPage() {
    // Check to see if we have anything stored in the DB
    chrome.storage.sync.get('stashList', function (data) {
        // ensure we have data
        if (data && data['stashList'] && data['stashList'].length > 0) {

            // Get random object from list
            var index = getRandomIndex(data['stashList'].length);

            // print object to screen
            printStashObject(data['stashList'][index]);

        } else {
            // if we did not find any data, show the intro div
            document.querySelector('#intro').classList.remove('hidden');

        }
    });
}

function printStashObject(stashObject) {
    // If any of the properties are not set return;
    if (!stashObject.datetime || !stashObject.url || !stashObject.text) {
        return;
    }

    // set data for displaying to screen
    var timeAgo = moment(stashObject.datetime).fromNow();
    var url = stashObject.url;
    var text = stashObject.text;

    // update screen with data from the stash object
    document.getElementById("date").innerHTML = timeAgo;
    document.getElementById("url").innerHTML = url;
    document.getElementById("url").href = url;
    document.getElementById("text").innerHTML = text;

    // Make sure we remove the intro
    document.querySelector('#stash').classList.remove('hidden');
}

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

initPage();