const utils = require("../utils.js");

module.exports = function (workspace) {
    workspace.showInputPalette("App label to make migrations for", {}, function(app) {
        utils.runManagementCommand("makemigrations", app);
    });
}
