const Song = require('../models/Song');
const filter = require('../utils/filter');

module.exports = {
    async search(req, res) {
        const { search } = req.query;
        const query = search.split(' ');
        let songs = [];

        for (let i in query) {
            songs.push(
                await Song.find({
                    $or: [
                        {
                            author: new RegExp(
                                query[i].replace(/\s+/g, '\\s+'),
                                'gi'
                            ),
                        },
                        {
                            name: new RegExp(
                                query[i].replace(/\s+/g, '\\s+'),
                                'gi'
                            ),
                        },
                        {
                            instrument: new RegExp(
                                query[i].replace(/\s+/g, '\\s+'),
                                'gi'
                            ),
                        },
                    ],
                })
            );
        }

        songs = filter(songs);

        return res.json(songs);
    },
};
