// Used to toggle the menu on small screens when clicking on the menu button

function toggleMenuVisibility(elementID) {
    var x = document.getElementById(elementID);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    }
    else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

function toggleVisibility(elementID) {
    var x = document.getElementById(elementID);
    if (x.style.display == "none") {
        x.style.display = "block";
    }
    else { 
        x.style.display = "none";
    }
}

function toggleLoadoutDetails(event, elementID) {
    // Make sure we're responding to a left mouse button down event
    if (event.button != 0) return;

    // Only act if either a loadout header or a contracted loadout details section was clicked
    if ( !event.srcElement.classList.contains("contracted") && !event.srcElement.classList.contains("pr-loadout-heading") ) return;

    const x = document.getElementById(elementID);
    x.classList.toggle("contracted");

    
    if (x.classList.contains("contracted")) {
        x.innerHTML = "";
    }
    else {
        x.innerHTML = x.backupInnerHTML;
    }
}

  
  // When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



