class DjangoTaskAssistant {
    resolveTaskAction(context) {
        let pythonPath = nova.workspace.config.get("python.interpreter");
        if (!pythonPath) {
            console.error("No python interpreter set!");
            return null;
        }

        if (context.action != Task.Run) {
            return null;
        }

        if (context.data.type == "runserver") {
            let bind = context.config.get("runserver.bind", "string");
            let reload = context.config.get("runserver.reload", "boolean");
            let staticfiles = context.config.get("runserver.static", "boolean");
            let threads = context.config.get("runserver.threads", "boolean");

            let args = [];
            args.push("manage.py");
            args.push("runserver");
            if (!reload) args.push("--noreload");
            if (!staticfiles) args.push("--nostatic");
            if (!threads) args.push("--nothreading");
            if (bind) args.push(bind);

            return new TaskProcessAction(pythonPath, {
                args: args,
                env: {
                    PYTHONUNBUFFERED: "1",
                },
            });
        } else if (context.data.type == "debug") {
            let bind = context.config.get("runserver.bind", "string");

            let action = new TaskDebugAdapterAction("djangodebug");
            action.command = pythonPath;

            let args = [];
            args.push("-m");
            args.push("debugpy.adapter");
            action.args = args;

            let debugArgs = {};
            let manageArgs = [];
            manageArgs.push("runserver");
            manageArgs.push("--noreload");
            if (bind) manageArgs.push(bind);

            debugArgs.program = nova.path.join(nova.workspace.path, "manage.py");
            debugArgs.args = manageArgs;
            debugArgs.cwd = nova.workspace.path;
            if (context.config.get("debug.templates.django", "boolean")) {
                debugArgs.django = true;
            }
            if (context.config.get("debug.templates.jinja", "boolean")) {
                debugArgs.jinja = true;
            }
            if (context.config.get("debug.external", "boolean")) {
                debugArgs.justMyCode = false;
            }

            action.debugArgs = debugArgs;
            return action;
        } else if (context.data.type == "manage") {
            let command = context.config.get("manage.command", "string");
            let manageArgs = context.config.get("manage.args", "array") || [];

            let args = [];
            args.push("manage.py");
            args.push(command);
            for (const a of manageArgs) {
                args.push(a);
            }

            return new TaskProcessAction(pythonPath, {
                args: args,
            });
        }

        return null;
    }
}

module.exports = DjangoTaskAssistant;
