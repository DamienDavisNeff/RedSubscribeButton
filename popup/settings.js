loadSettings();
// DEFAULT SETTINGS
var defaultSettings = {
  "subscribe": true,
  "subscribe-color": "#ff0000",
  "join": true,
  "join-color": "#005fd2",
  "like": true,
  "like-color": "#50a0f0",
  "uppercase-main": true,
  "uppercase-other": true,
  "rectangle": false,
  "rectangle-radius": 10
};
// LOAD SAVED SETTINGS ON LOAD
function loadSettings() {
  chrome.storage.local.get(["settings"], function(result) {
    var settings = result.settings;
    if (!settings || !CompareJSON(defaultSettings,settings)) LoadDefaults();
    // Set the checkboxes based on the loaded or default settings
    document.getElementById("subscribe").checked = settings["subscribe"];
    document.getElementById("subscribe-color").value = settings["subscribe-color"];
    document.getElementById("join").checked = settings["join"];
    document.getElementById("join-color").value = settings["join-color"];
    document.getElementById("like").checked = settings["like"];
    document.getElementById("like-color").value = settings["like-color"];
    document.getElementById("uppercase-main").checked = settings["uppercase-main"];
    document.getElementById("uppercase-other").checked = settings["uppercase-other"];
    document.getElementById("rectangle").checked = settings["rectangle"];
    document.getElementById("button-radius").value = settings["rectangle-radius"];
  });
}

function LoadDefaults() {
  document.getElementById("subscribe").checked = defaultSettings["subscribe"];
  document.getElementById("subscribe-color").value = defaultSettings["subscribe-color"];
  document.getElementById("join").checked = defaultSettings["join"];
  document.getElementById("join-color").value = defaultSettings["join-color"];
  document.getElementById("like").checked = defaultSettings["like"];
  document.getElementById("like-color").value = defaultSettings["like-color"];
  document.getElementById("uppercase-main").checked = defaultSettings["uppercase-main"];
  document.getElementById("uppercase-other").checked = defaultSettings["uppercase-other"];
  document.getElementById("rectangle").checked = defaultSettings["rectangle"];
  document.getElementById("button-radius").value = defaultSettings["rectangle-radius"];
  saveSettings();
}

// ON SETTINGS CHANGE
function saveSettings() {
  var settings = {
    "subscribe": document.getElementById("subscribe").checked,
    "subscribe-color": document.getElementById("subscribe-color").value,
    "join": document.getElementById("join").checked,
    "join-color": document.getElementById("join-color").value,
    "like": document.getElementById("like").checked,
    "like-color": document.getElementById("like-color").value,
    "uppercase-main": document.getElementById("uppercase-main").checked,
    "uppercase-other": document.getElementById("uppercase-other").checked,
    "rectangle": document.getElementById("rectangle").checked,
    "rectangle-radius": document.getElementById("button-radius").value
  };
  // Store the settings as a JSON object
  chrome.storage.local.set({"settings": settings});
}

// Add a change listener to each checkbox
document.getElementById("subscribe").addEventListener("change", saveSettings);
document.getElementById("subscribe-color").addEventListener("change",saveSettings);
document.getElementById("join").addEventListener("change", saveSettings);
document.getElementById("join-color").addEventListener("change",saveSettings);
document.getElementById("like").addEventListener("change", saveSettings);
document.getElementById("like-color").addEventListener("change",saveSettings);
document.getElementById("uppercase-main").addEventListener("change", saveSettings);
document.getElementById("uppercase-other").addEventListener("change", saveSettings);
document.getElementById("rectangle").addEventListener("change", saveSettings);
document.getElementById("button-radius").addEventListener("change", function() {
  if(document.getElementById("button-radius").value < 0) document.getElementById("button-radius").value = 0;
  saveSettings();
});

document.getElementById("reset").addEventListener("click", function() {
  if(confirm("Are you sure you want to reset to the default settings?")) LoadDefaults();
});

// Compare JSON elements
function CompareJSON(obj1,obj2) {
  if(Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for(let key in obj1) {
    if(!obj2.hasOwnProperty(key)) return false;
  }
  return true;
}