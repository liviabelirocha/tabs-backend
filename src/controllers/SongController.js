const Song = require('../models/Song');

module.exports = {
    async create(req, res) {
        const {
            originalname: filename,
            size,
            key,
            location: url = '',
        } = req.file;
        const { name, author, instrument, youtubeURL = '' } = req.body;
        const song = await Song.create({
            name,
            filename,
            author,
            instrument,
            youtubeURL,
            size,
            key,
            url,
        });
        return res.json(song);
    },

    async index(req, res) {
        const songs = await Song.find();
        return res.json(songs);
    },

    async delete(req, res) {
        const song = await Song.findById(req.params.id);
        await song.remove();
        return res.send();
    },

    async get(req, res) {
        const songs = await Song.findById({ _id: req.params.id });
        return res.json(songs);
    },
};
