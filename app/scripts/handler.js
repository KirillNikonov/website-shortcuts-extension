var keyDown = [];
var configs = [];
var currentUrl = document.URL;

var onkeypress = function (event) {
    keyDown[event.keyCode] = event.type == 'keydown';

    $.each(configs, function (i, config) {
        $.each(config.shortcuts, function (j, shortcut) {
            if (shortcut.binding.altKey === event.altKey &&
                shortcut.binding.ctrlKey === event.ctrlKey &&
                shortcut.binding.shiftKey === event.shiftKey) {

                var allKeysDown = shortcut.binding.keyCodes.every(function (keyCode) {
                    return keyDown[keyCode];
                });

                if (allKeysDown) {
                    var urlPattern = shortcut.context.url.replace(/\*/gi, '.*');
                    if (new RegExp(urlPattern).test(currentUrl) && eval(shortcut.context.active)) {
                        if (shortcut.preventDefault) {
                            event.preventDefault();
                        }

                        eval(shortcut.action.apply);

                        return false;
                    }
                }
            }
        });
    });
}

$(document).on('keydown', onkeypress);
$(document).on('keyup', onkeypress);

chrome.storage.local.get(null, function (configs) {
    window.configs = configs;
});