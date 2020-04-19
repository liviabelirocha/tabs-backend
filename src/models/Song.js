const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const { promisify } = require('util');
const mongoose = require('../database');

const s3 = new aws.S3();

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    instrument: {
        type: String,
        required: true,
    },
    youtubeURL: String,
    key: String,
    size: Number,
    url: String,
});

SongSchema.pre('save', function () {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/songs/${this.key}`;
    }
});

SongSchema.pre('remove', function () {
    if (process.env.STORAGE_TYPE === 's3') {
        return s3
            .deleteObject({
                Bucket: process.env.AWS_BUCKET,
                Key: this.key,
            })
            .promise();
    }
    return promisify(fs.unlink)(
        path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
    );
});

module.exports = mongoose.model('Song', SongSchema);
