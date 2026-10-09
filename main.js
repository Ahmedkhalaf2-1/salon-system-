const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
      autoHideMenuBar: true

  });
win.maximize();
  win.loadFile("dist/index.html"); // لو عندك build بدل dist قولّي
}

app.whenReady().then(createWindow);