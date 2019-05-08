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

    // Close the modal to prevent multiple creation events
    // in case the user smashes the submit button
    closeModal('creatorModal');

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


function openEditPackableModal(packableId) {
    /*
     * Transfer relevant data to the "Edit Packable" modal and open the modal
     */

    var modalField = document.getElementsByName("edit_packable_name")[0];
    modalField.value = document.getElementById("nameField"+packableId).innerText;

    modalField = document.getElementsByName("edit_packable_description")[0];
    modalField.innerHTML = document.getElementById("descriptionField"+packableId).innerText;

    modalField = document.getElementsByName("edit_packable_mass")[0];
    modalField.value = document.getElementById("massField"+packableId).innerText;

    modalField = document.getElementsByName("edit_packable_cost")[0];
    modalField.value = document.getElementById("costField"+packableId).innerText;

    modalField = document.getElementsByName("edit_packable_vendor")[0];
    modalField.value = document.getElementById("vendorField"+packableId).innerText;

    modalField = document.getElementsByName("edit_packable_consumable")[0];
    const checkboxElement = document.getElementById("consumableField"+packableId).children[0];

    modalField = document.getElementsByName("edit_packable_id")[0];
    modalField.value = packableId;

    if (checkboxElement.classList.contains("fa-check-square")) {
        modalField.checked = true;
    }
    else {
        modalField.checked = false;
    }

    openModal("editorModal");
}

function validateEditPackableForm() {
    /*
     *  Validate and potentially submit the "edit packable" form
     */

    // Close the modal to prevent multiple update events
    // in case the user smashes the submit button
    closeModal('editorModal');

    var form = document.forms["edit_packable_form"];
    var validationPassed = true;

    // Check the individual required fields
    if (!validAsNameString(form["edit_packable_name"]))
        validationPassed = false;
    if (!validAsNumber(form["edit_packable_mass"]))
        validationPassed = false;
    if (!validAsNumber(form["edit_packable_cost"]))
        validationPassed = false;
    
    // If the inputs are correctly formatted, submit the form
    if (validationPassed) {
        form.submit();
    }
}


function deletePackable() {
    /*
     * Deletes the packable opened for editing in editorModal
     */

    closeModal('editorModal');

    // Transfer the ID of the packable to deleted to the correct form
    const deleteForm = document.forms["delete_packable_form"];
    const deleteIdField = document.getElementsByName("delete_packable_id")[0];
    const editorIdField = document.getElementsByName("edit_packable_id")[0];

    deleteIdField.value = editorIdField.value;

    // The preceding operations should never fail since we only use the
    // internal ID which the user cannot access/disturb. So just submit.
    deleteForm.submit();
}