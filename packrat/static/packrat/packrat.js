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


function openModal(modalId) {
    document.getElementById(modalId).style.display='block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display='none';
}

function validateNewPackableForm() {
    /*
     *  Validate and potentially submit the "create new packable" form
     */

    form = document.forms["new_packable_form"];
    var validationPassed = true;


    // Check that some name has been given
    var name = form["new_packable_name"].value;
    if (name == "") {
        validationPassed = false;

        form["new_packable_name"].style.backgroundColor = "#ffd7cc";
        form["new_packable_name"].placeholder = "A name is required!";
    }
    else {
        form["new_packable_name"].style.backgroundColor = "#eee";
    }

    // Check that the given mass is a number and uses dot as decimal separator
    var mass = form["new_packable_mass"].value.replace(",", ".");
    form["new_packable_mass"].value = mass;

    if (mass == "" || isNaN(mass)) {
        validationPassed = false;

        form["new_packable_mass"].style.backgroundColor = "#ffd7cc";
        form["new_packable_mass"].placeholder = "Please enter a number!";
    }
    else {
        form["new_packable_cost"].style.backgroundColor = "#eee";
    }

    // Check that the given cost is a number and uses dot as decimal separator
    var cost = form["new_packable_cost"].value.replace(",", ".");
    form["new_packable_cost"].value = cost;

    if (cost == "" || isNaN(cost)) {
        validationPassed = false;

        form["new_packable_cost"].style.backgroundColor = "#ffd7cc";
        form["new_packable_cost"].placeholder = "Please enter a number!";
    }
    else {
        form["new_packable_cost"].style.backgroundColor = "#eee";
    }
    
    // If the inputs are correctly formatted, submit the form
    if (validationPassed) {
        form.submit();
    }
}