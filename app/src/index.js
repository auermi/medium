const { app, BrowserWindow } = require('electron');

const request = require('request');
const { parseString } = require('xml2js');


let username = 'auermi';

app.on('ready', () => {
  // New Browser Window
  const mainWindow = new BrowserWindow({
      width: 420,
      height: 640,
      resizable: false
  })

  const renderActivities = activities => {
    activities.forEach(activity => {
      console.log(activity.link[0]);
      console.log(activity.title[0]);
    })
  }
  request(`https://www.medium.com/feed/@${username}`, (err, res) => {
    parseString(res.body, function (err, result) {
      const activities = result.rss.channel[0].item;
      renderActivities(activities);
    });
    // if (!err && res.statusCode == 200) {
    //   //JSON.stringify(response.body, null, 2))
    //   renderPosts(JSON.parse(res.body.replace('])}while(1);</x>', '')).payload)
    // } else {
    //   console.log('nope')
    //   return []
    // }
});


  mainWindow.loadURL('file://' + __dirname + '/../index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

});
