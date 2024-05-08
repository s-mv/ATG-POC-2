const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require("./models");
const { Profile } = db;

app.use(bodyParser.json());

app.post("/send_profile", async (req, res) => {
    const { name, connections, location, followers, bio } = req.body;
    const profile = await Profile.create({
        name,
        connections,
        location,
        followers,
        bio
    });
    console.log("done");
    res.json({ "done": true });
});

app.get('/profiles', async (req, res) => {
    const profiles = await Profile.findAll();
    res.json(profiles);
});

db.sequelize.sync().then(req => {
    app.listen(5000, () => {
        console.log("server running now");
    });
});
