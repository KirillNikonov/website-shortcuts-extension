var optionsModule = angular.module('Options', [
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap'
]);

optionsModule.controller("OptionsController", ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.configsList = {
        configs: []
    };

    $scope.editor = {};

    $scope.toggleExpanded = function (item) {
        if (typeof item.isExpanded === 'boolean') {
            item.isExpanded = !item.isExpanded;
        }
    };

    // Load actual shortcuts configuration
    // from configuration files in local storage
    $scope.loadConfigs = function () {
        $scope.configs = [];
        chrome.storage.local.get(null, function (configs) {
            $scope.$apply(function () {
                for (var key in configs) {
                    if (configs.hasOwnProperty(key)) {
                        $scope.configsList.configs.push(configs[key]);
                    }
                }
            });
        });
    };

    $scope.selectShortcut = function (shortcut) {
        if (!$scope.shortcutSelected() ||
            $scope.editor.shortcut.name !== shortcut.name) {
            $scope.editor.shortcut = shortcut;
            $timeout(function () {
                var tags = document.getElementsByClassName('editor');
                for (var i = 0; i < tags.length; i++) {
                    tags[i].innerHTML = tags[i].innerHTML.replace(/^\s+/m, "");
                    tags[i].innerHTML = tags[i].innerHTML.replace(/\s+$/m, "");
                }
            });
        }
    };

    $scope.shortcutSelected = function () {
        return typeof $scope.editor.shortcut !== 'undefined'
    };

    $scope.loadConfigs();
}]);