const express = require('express');
const cors = require('cors');
const lyricsFinder = require("lyrics-finder")
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "e39eac5b47f9486f9d52a565f426f9ae",
        clientSecret: "20303abc0b1a429f8c5f2006ea843047",
        refreshToken
    })
    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn:data.body.expiresIn
            })
        }).catch(() => {
            res.sendStatus(400)
        });



})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "e39eac5b47f9486f9d52a565f426f9ae",
        clientSecret: "20303abc0b1a429f8c5f2006ea843047"
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400)
    })

})
app.get("/lyrics", async (req, res) => {
    const lyrics =
      (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
  })
app.listen(3001)