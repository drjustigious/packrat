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

    var form = document.forms["new_packable_form"];
    var validationPassed = true;

    // Check the individual required fields
    if (!validAsNameString(form["new_packable_name"]))
        validationPassed = false;
    if (!validAsNumber(form["new_packable_mass"]))
        validationPassed = false;
    if (!validAsNumber(form["new_packable_cost"]))
        validationPassed = false;
    
    // If the inputs are correctly formatted, submit the form
    if (validationPassed) {
        form.submit();
    }
}

function validAsNameString(formField) {
    /*
     * Checks that the value entered in 'formField' is a non-empty string
     * and returns 'true' if it is. Otherwise, marks the field with red.
     */
    var validationPassed = true;
    const enteredValue = formField.value;

    if (enteredValue == "") {
        validationPassed = false;

        formField.style.backgroundColor = "#ffd7cc";
        formField.placeholder = "A name is required!";
    }
    else {
        formField.style.backgroundColor = "#eee";
    }

    return validationPassed;
}

function validAsNumber(formField) {
    /*
     * Checks that the value entered in 'formField' is a valid (decimal) number
     * and returns 'true' if it is. Otherwise, marks the field with red.
     */
    var validationPassed = true;

    // Change the decimal separator to a dot if a comma was used
    const enteredValue = formField.value.replace(",", ".");
    formField.value = enteredValue;

    // Check that the entered value is a number
    if (enteredValue == "" || isNaN(enteredValue)) {
        validationPassed = false;

        formField.style.backgroundColor = "#ffd7cc";
        formField.placeholder = "Please enter a number!";
    }
    else {
        formField.style.backgroundColor = "#eee";
    }

    return validationPassed;
}