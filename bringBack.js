const theClass = "style-scope ytd-subscribe-button-renderer"; // This is the class for the subscribe button
window.onload = function() {
    // loops checking until the button is found
    var check = setInterval(() => {
        if(Checking()) {
            clearInterval(check); // if its found clears interval
            clearTimeout(clear); // and clears timeout
        }
    }, 10);
    // or 5 seconds passes
    var clear = setTimeout(() => {
        console.warn(`Subscribe button not found, terminating search
        \nThis may be because you are on a page where the subscribe button is not present, or your computer is too slow`);
        console.warn("If your computer is too slow, don't worry, I am working on a fix to customize timeout!");
    }, 5000);
}
function Checking() {
    buttons = document.querySelectorAll("yt-button-shape"); // finds all youtube buttons
    // loops through them
    for(let a = 0; a < buttons.length; a++) {
        // and finds matching button
        if(buttons[a].getAttribute("class") == theClass) {
            ChangeColor(buttons[a]); // when found change the color of the button
            return true;
        }
    }
    return false; // if the button is not found, returns false
}
function ChangeColor(element) {
    const button = element.querySelectorAll("button")[0]; // finds the button element from parent
    button.style.textTransform = "uppercase"; // makes text uppercase like old
    // Changes color depending on state
    if(!button.getAttribute("aria-label").includes("Unsubscribe")) {
        button.style.color = "white";
        button.style.backgroundColor = "red";
    } else {
        button.style.color = "";
        button.style.backgroundColor = "";
    }
}
window.addEventListener("click", function() {
    Checking(); // Rechecks in case subscribe status changed
});