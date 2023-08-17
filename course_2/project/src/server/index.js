require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');
const cors = require('cors');  // Import the CORS module

const app = express();
const port = 3000;

app.use(cors());  // Use the CORS middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

// your API calls

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/rover/:name', async (req, res) => {
    try {
        const roverName = req.params.name;
        let roverData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send(roverData);
    } catch (err) {
        console.log('error:', err);
    }
});

app.get('/rover/:name/photos', async (req, res) => {
    try {
        const roverName = req.params.name;

        // Step 1: Get the rover manifest
        const manifest = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=${process.env.API_KEY}`)
            .then(res => res.json());
        
        // Get the latest sol from the manifest
        const latestSol = manifest.photo_manifest.max_sol;

        // Step 2: Get the photos for the latest sol
        let roverPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${latestSol}&api_key=${process.env.API_KEY}`)
            .then(res => res.json());

        // Filter to get only the three latest photos
        roverPhotos.photos = roverPhotos.photos.slice(-3);

        res.send(roverPhotos);
    } catch (err) {
        console.log('error:', err);
        res.status(500).send('Error fetching rover photos.');
    }
});
