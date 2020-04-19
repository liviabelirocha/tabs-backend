const bcrypt = require('bcryptjs');
const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },
});

// eslint-disable-next-line prettier/prettier
UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

module.exports = mongoose.model('User', UserSchema);
