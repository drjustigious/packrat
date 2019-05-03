/*
 * This script must load AFTER the user interface elements are defined in HTML.
 */
function toggleMenuVisibility(elementID) {
    var x = document.getElementById(elementID);
    x.classList.toggle("w3-show");
}


var coll = document.getElementsByClassName("pr-loadout-collapsible");
var i;

for (i = 0; i < coll.length; i++) {

    coll[i].addEventListener("click", function() {

        this.classList.toggle("active");
        var content = this.nextElementSibling;
        content.classList.toggle("uncollapsed");

        //var caret = this.children;
        var caret = this.querySelector(".pr-loadout-caret").children[0];
        caret.classList.toggle("fa-angle-double-down");
        caret.classList.toggle("fa-angle-double-up");
        //console.log("Caret:", caret);

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}


function handleWindowResize() {

    // Update the maxHeight of open collapsible containers
    var affectedElements = document.getElementsByClassName("pr-loadout-content");

    for (var i = 0; i < affectedElements.length; i++) {
        var element = affectedElements[i];
        if (element.style.maxHeight != null && element.style.maxHeight != 0) {
            element.style.maxHeight = element.scrollHeight + "px";
        }
    }
}