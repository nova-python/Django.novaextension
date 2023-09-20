const DjangoTaskAssistant = require("tasks.js");

exports.activate = function () {};

exports.deactivate = function () {};

nova.commands.register("django.migrate", require("commands/migrate.js"));
nova.commands.register("django.makeMigrations", require("commands/makeMigrations.js"));
nova.commands.register("django.initMigrations", require("commands/initMigrations.js"));
nova.commands.register("django.formatSQL", require("commands/formatSQL.js"));

nova.assistants.registerTaskAssistant(new DjangoTaskAssistant(), {
    identifier: "django",
    name: "Django",
});
