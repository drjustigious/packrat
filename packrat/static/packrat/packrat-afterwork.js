// toggle detail panel visibility
function hideItem(item) {
    item.backupInnerHTML = item.innerHTML;
    item.innerHTML = "";
    item.classList.toggle("contracted");
}
const panelsToHide = Array.from(document.getElementsByClassName("pr-loadout-body"));
panelsToHide.forEach(hideItem);
