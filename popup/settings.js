window.onload = LoadSettings();
async function LoadSettings() {
    await chrome.storage.local.get(["settings"]).then((result) => {
        if(result == undefined) LoadDefaults();
    })
}

async function TempSave() {
    const value = "temp";
    chrome.storage.local.set({"settings":value}).then(() => {
        console.log("saved");
        LoadSettings();
    })
}