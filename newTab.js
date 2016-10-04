
function initPage() {
    // Check to see if we have anything stored at the date selected
    chrome.storage.sync.get('stashList', function (data) {
        // Notify that we saved.
        if (data && data['stashList'] && data['stashList'].length > 0) {

            // Get random object
            var index = getRandomIndex(data['stashList'].length);

            // Init our object
            var stashObject = data['stashList'][index];

            printStashObject(stashObject);

        }
    });
}

function printStashObject(stashObject) {

    // If any of the properties are not set return;
    if (!stashObject.datetime || !stashObject.url || !stashObject.text) {
        return;
    }

    var timeAgo = moment(stashObject.datetime).fromNow();
    var url = stashObject.url;
    var text = stashObject.text;



    document.getElementById("date").innerHTML = timeAgo;
    document.getElementById("url").innerHTML = url;
    document.getElementById("url").href = url;
    document.getElementById("text").innerHTML = text;

    // Make sure we remove the intro
    document.querySelector('#intro').classList.toggle('hidden');
    document.querySelector('#stash').classList.toggle('hidden');

}

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

initPage();