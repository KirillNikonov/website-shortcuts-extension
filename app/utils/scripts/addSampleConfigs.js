// Loads sample configs into local storage
function addSampleConfigs(configsPath) {

    if (typeof configsPath === 'undefined')
        configsPath = '/examples/';

    var configFiles = [
        'Common.json',
        'YouTube.json',
        'Github.json'
    ];

    for (var i = 0; i < configFiles.length; i++) {
        $.getJSON(chrome.extension.getURL(configsPath + configFiles[i]), function (config) {
            var storageEntry = {};
            storageEntry[config.name] = config;

            chrome.storage.local.set(storageEntry);
        });
    }
}