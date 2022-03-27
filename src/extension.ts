import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('timer.create', () => {
        showInput('Create a timer for how many minutes?').then((minutes: string | undefined) => {
            if (minutes === undefined || minutes === '') return;

            showInput('Timer message?').then((message: string | undefined) => {
                if (message === undefined || message === '') {
                    message = 'Time is up!';
                }

                runTimer(+minutes, message);
            });
        });
    });

    context.subscriptions.push(disposable);
}

function showInput(title: string): Thenable<string | undefined> {
    return vscode.window.showInputBox({ title });
}

function runTimer(minutes: number, message: string): void {
    setTimeout(
        () => {
            const addTimeString = 'Add 5 minutes';

            vscode.window.showInformationMessage(message, addTimeString).then((selectedItem: string | undefined) => {
                if (selectedItem === addTimeString) {
                    runTimer(5, message);
                }
            });
        },
        +minutes * 60000
    );
}

export function deactivate() {}
