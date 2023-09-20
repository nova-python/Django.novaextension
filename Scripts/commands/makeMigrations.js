const utils = require("../utils.js");

module.exports = function(workspace) {
    utils.runManagementCommand("makemigrations");
}
