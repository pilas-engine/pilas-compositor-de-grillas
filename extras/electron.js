/* jshint node: true */
var electron = require('electron');

var app = electron.app;
var mainWindow = null;
var BrowserWindow = electron.BrowserWindow;


app.on('window-all-closed', function onWindowAllClosed() {
  app.quit();
});

app.on('ready', function onReady() {

  mainWindow = new BrowserWindow({
    width: 951,
    height: 672,
    minWidth: 500,
    minHeight: 500,
  });

  delete mainWindow.module;

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function onClosed() {
    mainWindow = null;
  });

});
