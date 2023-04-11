const Files = {
    "css/subscribe_button.css":"subscribe",
    "css/blue_buttons.css":"join",
    "css/like_button.css":"like",
    "css/uppercase_letters.css":"uppercase-main",
    "css/uppercase_engagment.css":"uppercase-other",
    "css/rectangle_buttons.css":"rectangle"
}
const DefaultSettings = {
    "subscribe": true,
    "subscribe-color": "#ff0000",
    "join": true,
    "join-color": "#005fd2",
    "like": true,
    "like-color": "#50a0f0",
    "uppercase-main": true,
    "uppercase-other": false,
    "rectangle": false,
    "rectangle-radius": 10
}

// Chrome Storage Event
chrome.storage.onChanged.addListener((changes,namespace) => {
    for(let key in changes) {
        if(key === "settings") {
            const newSettings = changes[key].newValue;
            UpdateFiles(newSettings);
        }
    }
});
// Page Visibility Event
document.addEventListener("visibilitychange",function() {
    if(document.visibilityState === "visible") {
        chrome.storage.local.get("settings",function(result) {
            if(!result.settings) {
                settings = DefaultSettings;
                chrome.storage.local.set({"settings":settings});
            } else {
                settings = result.settings;
            }
            UpdateFiles(settings);
        })
    }
})

// On Load
LoadSettings();
function LoadSettings() {
    chrome.storage.local.get(["settings"], function(result) {
        var settings = result.settings;
        if(!settings || !CompareJSON(DefaultSettings,settings)) LoadDefaults();
        UpdateFiles(settings);
    })
}
function LoadDefaults() {
    settings = DefaultSettings;
    chrome.storage.local.set({"settings":settings});
    UpdateFiles(settings);
}

// Update File Information
function UpdateFiles(settings) {
    for(let file in Files) {
        const optionKey = Files[file];
        const isEnabled = settings[optionKey];
        if(isEnabled) {
            AddFile(file);
        } else {
            RemoveFile(file);
        }
    }
    document.documentElement.style.setProperty('--subscribe-red',settings["subscribe-color"]);
    document.documentElement.style.setProperty('--text',settings["text-color"]);
    document.documentElement.style.setProperty('--light-blue',settings["like-color"]);
    document.documentElement.style.setProperty('--dark-blue',settings["join-color"]);
    document.documentElement.style.setProperty('--border-radius-rect',`${settings["rectangle-radius"]}px`);
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

// Compare JSON
function CompareJSON(obj1,obj2) {
    if(Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for(let key in obj1) {
      if(!obj2.hasOwnProperty(key)) return false;
    }
    return true;
  }