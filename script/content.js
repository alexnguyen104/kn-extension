var LAST_SELECTION,
    LAST_ELEMENT;
var currentDegree = 0


document.body.addEventListener('contextmenu', function(e) {
    LAST_SELECTION = window.getSelection();
    LAST_ELEMENT = e.target;
    // this will update your last element every time you right click on some element in the page
}, false);

// changing content of the site
chrome.runtime.onMessage.addListener(function(message) {
    let receivedDegree = message.parameter;

    rotate(receivedDegree)

});

function rotate(receivedDegree){
    currentDegree += receivedDegree

    if (LAST_ELEMENT) {
        // do whatever you want with the element that has been right-clicked
        LAST_ELEMENT.style.transform = "rotate(" + currentDegree.toString() + "deg)";
    }
}