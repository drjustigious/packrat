const VERSION_STRING = "<b>Pack Rat v. 0.0.1</b>";
const AUTHOR_STRING = "by Jussi Tikkanen";



// Insert version and author info at the bottom of the page
const versionInfos = document.getElementsByClassName("pack-rat-version-info");

if (versionInfos.length > 0) {
    versionInfos[0].innerHTML = VERSION_STRING + "<br>" + AUTHOR_STRING;
    //console.log("Version and author info updated.");
}



// Insert current timestamp to specified elements
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function ordinalString(num) {
    if (num == "1")
        return "st";
    if (num == "2")
        return "nd";
    if (num == "3")
        return "rd";
    return "th";
}

const currentDatetime = new Date();
const dayString = String(currentDatetime.getDate());

const timeStamp = dayString + ordinalString(dayString.slice(-1)) + " "
    + String(monthNames[currentDatetime.getMonth()]) + " "
    + String(currentDatetime.getFullYear()) + " at "
    + String(currentDatetime.getHours()).padStart(2, '0') + ":"
    + String(currentDatetime.getMinutes()).padStart(2, '0') + ":"
    + String(currentDatetime.getSeconds()).padStart(2, '0');

const timeStampElements = document.getElementsByClassName("pack-rat-timestamp");

if (timeStampElements.length > 0) {
    timeStampElements[0].innerHTML = timeStamp;
    //console.log("Version and author info updated.");
}


// hide config panels
function hideItem(item) {
    item.backupInnerHTML = item.innerHTML;
    item.innerHTML = "";
    item.classList.toggle("contracted");
}
const panelsToHide = Array.from(document.getElementsByClassName("pr-loadout-body"));
panelsToHide.forEach(hideItem);