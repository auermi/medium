const { app, BrowserWindow } = require('electron');

const request = require('request');
const { parseString } = require('xml2js');

let username = 'auermi';

const activityTemplate = activity => {
  const markup = `
    <a href="${activity.link}">
      <div class="left">
        <div class="title">${activity.title}</div>
        <div class="subtitle">
          <div class="author">n/a</div>
          <div class="divider">|</div>
          <div class="date">${activity.date}</div>
        </div>
      </div>
      <div class="right">›</div>
    </a>
  `
  return markup
}

app.on('ready', () => {

  const mainWindow = new BrowserWindow({
      width: 420,
      height: 640,
      resizable: false
  });

  const renderActivities = activities => {
    let markup = '';
    activities.forEach(activity => {
      const x = {
        link: activity.link[0],
        title: activity.title[0],
        date: activity.pubDate[0]
      }
      markup += activityTemplate(x);
    });
    return markup;
  }
  request(`https://www.medium.com/feed/@${username}`, (err, res) => {
    parseString(res.body, function (err, result) {
      const activities = result.rss.channel[0].item;
      mainWindow.webContents.send('render-activities', renderActivities(activities));
    });
  });

  mainWindow.loadURL('file://' + __dirname + '/../index.html');

});
