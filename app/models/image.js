'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const imageSchema = Schema({
  image: String,
});

module.exports = Mongoose.model('Image', imageSchema);