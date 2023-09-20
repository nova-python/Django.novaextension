module.exports = function (editor) {
    if (editor.document.isEmpty) {
        return;
    }

    let pythonPath = nova.workspace.config.get("python.interpreter");
    if (!pythonPath) {
        console.error("No python interpreter set!");
        return;
    }

    let execPath = nova.path.join(nova.path.dirname(pythonPath), "sqlformat");
    let process = new Process(execPath, {
        args: [
            "--reindent",
            "--keywords",
            "upper",
            "--indent_width",
            "4",
            "--indent_columns",
            "-",
        ],
        stdio: "pipe",
        cwd: nova.workspace.path,
    });

    if (!process) {
        return;
    }

    const textRange = new Range(0, editor.document.length);
    const content = editor.document.getTextInRange(textRange);

    let outBuffer = [];
    let errBuffer = [];

    process.onStdout((output) => outBuffer.push(output));
    process.onStderr((error) => errBuffer.push(error));
    process.onDidExit((status) => {
        if (status === 0) {
            const formattedContent = outBuffer.join("");

            let result = editor.edit((edit) => {
                if (formattedContent !== content) {
                    edit.replace(
                        textRange,
                        formattedContent,
                        InsertTextFormat.PlainText
                    );
                }
            });
        } else {
            console.error(errBuffer.join(""));
        }
    });

    process.start();

    let writer = process.stdin.getWriter();

    writer.ready.then(() => {
        writer.write(content);
        writer.close();
    });
};
