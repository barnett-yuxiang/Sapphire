const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("sapphire.start", () => {
      const panel = vscode.window.createWebviewPanel(
        "sapphirePanel",
        "Sapphire",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      // 加载 media/webview.html 文件
      const webviewPath = path.join(
        context.extensionPath,
        "media",
        "webview.html"
      );
      const webviewContent = fs.readFileSync(webviewPath, "utf8");
      panel.webview.html = webviewContent;
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
