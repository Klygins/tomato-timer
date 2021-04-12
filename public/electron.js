const electron = require("electron");
const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  ipcMain,
  Notification
} = electron;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let tray

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380 * (isDev ? 2.5 : 1),
    height: 500,
    resizable: isDev,
    icon: '../public/icon.png',
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: false,
      preload: path.join(__dirname, 'electron-preload.js')
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

  mainWindow.on('minimize', function (event) {
    event.preventDefault();
    mainWindow.hide();
    tray = createTray();
  });

  mainWindow.on('restore', function (event) {
    mainWindow.show();
    tray.destroy();
  });


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


ipcMain.on('notify', (_, arg) => {
  sendNotification(arg.title, arg.body)
})

function sendNotification(title, body) {
  new Notification({
    title, body
  }).show();
}


function createTray() {
  let appIconTray = new Tray(path.join(__dirname, 'images', 'tray.png'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Exit', click: function () {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  appIconTray.on('click', (event) => {
    mainWindow.show();
  })

  appIconTray.setToolTip('Open Tomato App');
  appIconTray.setContextMenu(contextMenu);
  return appIconTray;
}
