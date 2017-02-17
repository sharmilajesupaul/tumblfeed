require('dotenv').config();
const request = require('request');

const createPath = (req) => {
  let url     = 'https://api.tumblr.com/v2/';
  let blog    = req.blog;
  let tag     = req.tag;
  let postUrl = null;

  // NOTE: I wanted to be able to handle a blog name, tag name, or both
  // the if/else if statements check for each case.
  if (blog && tag) {
    postUrl = url + 'blog/' + blog + '/posts?api_key=' + process.env.API_KEY + '&tag=' + tag;
  } else if (blog) {
    postUrl = url + 'blog/' + blog + '/posts?api_key=' + process.env.API_KEY;
  } else if (tag) {
    postUrl = url + 'tagged?api_key=' + process.env.API_KEY + '&tag=' + tag;
  }
  return postUrl;
};

const feed = {
  // queries for blog or tag
  query: (req, res) => {
    let postUrl = createPath(req.body);
    // makes a request to the tumblr url
    request({
      url: postUrl,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      } else {
        res.status(500).send('Something broke!')
      }
    })
  },
  // gets initial data from illustration.media
  get: (req, res) => {
    let url = 'https://api.tumblr.com/v2/blog/staff/posts?api_key=' + process.env.API_KEY;
    // makes a request to the tumblr url
    request({
      url: url,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      } else {
        res.status(500).send('Something broke!')
      }
    });
  }
}

module.exports = feed;
