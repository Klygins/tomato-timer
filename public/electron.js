const electron = require("electron");
const {
  app,
  BrowserWindow,
  Menu
} = electron;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380 * (isDev ? 2.5 : 1),
    height: 500,
    resizable: isDev,
    icon: '../src/icon.png',
    webPreferences: {
      backgroundThrottling: false
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.on('ready-to-show', () => app.focus())

  mainWindow.setMenu(null)

  if (isDev)
    mainWindow.webContents.openDevTools()
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
