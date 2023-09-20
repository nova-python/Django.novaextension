exports.runManagementCommand = function (cmd, ...args) {
    return new Promise((resolve, reject) => {
        let pythonPath = nova.workspace.config.get("python.interpreter");
        if (!pythonPath) {
            return reject("No python interpreter set!");
        }

        let process = new Process(pythonPath, {
            args: ["manage.py", cmd, ...args],
            stdio: "pipe",
            cwd: nova.workspace.path,
        });

        var stdout = "";
        var stderr = "";

        process.onStdout((line) => {
            stdout += line;
        });

        process.onStderr((line) => {
            stderr += line;
        });

        process.onDidExit((code) => {
            return resolve({
                stdout: stdout,
                stderr: stderr,
                status: code,
                success: code == 0,
            });
        });

        process.start();
    });
};
