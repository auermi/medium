'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const request = require('request')

let mainWindow

let username = 'auermi'

app.on('ready', () => {
  // New Browser Window
  mainWindow = new BrowserWindow({
      width: 420,
      height: 640,
      resizable: false
  })

  // request('http://www.medium.com/@auermi?format=json', function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     const data = JSON.parse(body.replace('])}while(1);</x>', ''))
  //     console.log(data)
  //   }
  // })


  mainWindow.loadURL('file://' + __dirname + '/../index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

})
