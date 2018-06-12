const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const path = require('path');
const mongoose = require("mongoose");
require('dotenv').config()
require("./ipc.js");

let mainWindow;
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 680,
		minWidth: 750,
		minHeight: 500
	});

	mongoose.connect(process.env.DB_HOST);

	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	app.setAboutPanelOptions({
		applicationName: "WeightStats",
		applicationVersion: "0.1.0",
	})
	mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
