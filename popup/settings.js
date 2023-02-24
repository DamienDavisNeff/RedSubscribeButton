// LOAD SAVED SETTINGS ON LOAD
function loadSettings() {
    chrome.storage.local.get(['settings'], function(result) {
      var settings = result.settings;
      if (!settings) {
        // Load default settings if no settings are found
        settings = {
          'subscribe': true,
          'join': true,
          'like': true,
          'uppercase': true,
          'rectangle': false
        };
      }
      // Set the checkboxes based on the loaded or default settings
      document.getElementById('subscribe').checked = settings.subscribe;
      document.getElementById('join').checked = settings.join;
      document.getElementById('like').checked = settings.like;
      document.getElementById('uppercase').checked = settings.uppercase;
      document.getElementById('rectangle').checked = settings.rectangle;
    });
  }
  
  // ON SETTINGS CHANGE
  function saveSettings() {
    var settings = {
      'subscribe': document.getElementById('subscribe').checked,
      'join': document.getElementById('join').checked,
      'like': document.getElementById('like').checked,
      'uppercase': document.getElementById('uppercase').checked,
      'rectangle': document.getElementById('rectangle').checked
    };
    // Store the settings as a JSON object
    chrome.storage.local.set({'settings': settings});
  }
  
  // Call loadSettings() when the extension loads
  loadSettings();
  
  // Add a change listener to each checkbox
  document.getElementById('subscribe').addEventListener('change', saveSettings);
  document.getElementById('join').addEventListener('change', saveSettings);
  document.getElementById('like').addEventListener('change', saveSettings);
  document.getElementById('uppercase').addEventListener('change', saveSettings);
  document.getElementById('rectangle').addEventListener('change', saveSettings);
  