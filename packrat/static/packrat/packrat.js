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


var coll = document.getElementsByClassName("collapsible");
var i;

console.log("Writ.");

for (i = 0; i < coll.length; i++) {
    console.log("Registering", coll[i]);

    coll[i].addEventListener("onclick", function() {

        console.log("Click!");

        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}