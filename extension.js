const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

function activate(context) {
  console.log("[Sapphire] Extension activated");

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
    let htmlContent = fs.readFileSync(htmlPath, "utf8");

    const sendIconUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "send.svg")
    );

    const iconUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "icon.svg")
    );

    const stylesUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "styles.css")
    );

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, "media"),
      ],
    };

    htmlContent = htmlContent
      .replace("{{SEND_ICON_URI}}", sendIconUri.toString())
      .replace("{{ICON_URI}}", iconUri.toString())
      .replace("{{STYLES_URI}}", stylesUri.toString());

    webviewView.webview.html = htmlContent;
  }
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
