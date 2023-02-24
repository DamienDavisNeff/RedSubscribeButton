const Files = {
    "css/subscribe_button.css":"subscribe",
    "css/blue_buttons.css":"join",
    "css/like_button.css":"like",
    "css/uppercase_letters.css":"uppercase",
    "css/rectangle_buttons.css":"rectangle"
}

// runs on setting change
chrome.storage.onChanged.addListener((changes,namespace) => {
    for(let key in changes) {
        if(key === "settings") {
            const newSettings = changes[key].newValue;
            UpdateFiles(newSettings);
        }
    }
});
// runs on page load
chrome.storage.local.get("settings",function(result) {
    let settings = result.settings;
    if(!settings) {
        settings = {
            "subscribe":true,
            "join":true,
            "like":true,
            "uppercase":true,
            "rectangle":false
        }
        chrome.storage.local.set({"settings":settings});
    }
    UpdateFiles(settings);
})

function UpdateFiles(settings) {
    for(let file in Files) {
        const optionKey = Files[file];
        const isEnabled = settings[optionKey];
        console.log(`File: ${file}, Option key: ${optionKey}, Is enabled: ${isEnabled}`);
        if(isEnabled) {
            AddFile(file);
        } else {
            RemoveFile(file);
        }
    }
}
function AddFile(file) {
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL(file);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}
function RemoveFile(file) {
    const links = document.querySelectorAll(`link[href="${chrome.runtime.getURL(file)}"]`);
    links.forEach(link => link.remove());
}