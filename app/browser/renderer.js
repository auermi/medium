const { ipcRenderer } = require('electron');

ipcRenderer.on('render-activities', (event, arg) => {
  document.getElementById('activities').innerHTML = arg;
});
