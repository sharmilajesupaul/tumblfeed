require('dotenv').config();
const express    = require('express');
const app        = express();
const feed       = require('./feed.js')
const bodyParser = require('body-parser')

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', express.static(__dirname + '/public'));

app.post('/find_posts', feed.query);

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
});
