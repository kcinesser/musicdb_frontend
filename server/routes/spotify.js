const request = require("request");
const router = require("express").Router();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_SECRET_ID;

router.route("/").post((req, res) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var value = "suf";

      var options = {
        url:
          "https://api.spotify.com/v1/search?q=" +
          value +
          "&type=artist,track&limit=7",
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };

      request.get(options, function (error, response, body) {
        res.json(body);
      });
    }
  });
});

// Search for an artist
router.route("/artists").post((req, res) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var value = "suf";

      var options = {
        url:
          "https://api.spotify.com/v1/search?q=" +
          req.body.value +
          "&type=artist&limit=7",
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };

      request.get(options, function (error, response, body) {
        res.json(body);
      });
    }
  });
});

// Search for a song for a specific artist
router.route("/songs").post((req, res) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var search = encodeURI(req.body.value);
      search = search.replace("&", "");

      var options = {
        url:
          "https://api.spotify.com/v1/search?q=" +
          search +
          "&type=track&limit=7",
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };

      request.get(options, function (error, response, body) {
        res.json(body);
      });
    }
  });
});

module.exports = router;
