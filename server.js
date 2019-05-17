const express = require('express');


const server = express();

server.use(express.json());

// server.use('/api/tracks', tracksRouter);
const data =  [
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },

]
server.get('/games', async(req, res) => {
    res.status(200).json(data)
})


server.post('/games', async(req, res) => {
    try {
        const { title, genre, releaseYear } = req.body
        if(title && genre ) {
            const game = {title, genre, releaseYear}
            data.push(game)
            await res.status(201).json(game)
        } else {
            await res.status(422).json({error: 'Bad Request'})
        }
    } catch (err) {
        await res.status(500).json({error: err.message})
    }

})

// sanity check route
server.get('/', (req, res) => {
  res.status(200).json({ greeting: 'Welcome!' });
});

module.exports = server;
