const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

function activate(context) {
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "sapphireView",
      new SapphireViewProvider(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("sapphire.start", () => {
      vscode.window.showInformationMessage(
        "Sapphire is already shown in the side panel."
      );
    })
  );
}

class SapphireViewProvider {
  constructor(context) {
    this.context = context;
  }

  resolveWebviewView(webviewView, context, _token) {
    const htmlPath = path.join(
      this.context.extensionPath,
      "media",
      "webview.html"
    );
    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = htmlContent;
  }
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
