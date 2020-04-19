const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authConfig = require('../config/auth');

module.exports = {
    async create(request, response) {
        const { username } = request.body;

        try {
            if (await User.findOne({ username })) {
                return response
                    .status(400)
                    .send({ error: 'User already exists.' });
            }

            const user = await User.create(request.body);
            user.password = undefined;

            return response.send({ user });
        } catch (err) {
            return response
                .status(400)
                .send({ error: 'Registration failed. ' });
        }
    },

    async login(request, response) {
        const { username, password } = request.body;
        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return response.status(400).send({ error: 'User not found.' });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return response.status(400).send({ error: 'Incorrect password. ' });
        }

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret);

        return response.send({ user, token });
    },
};
