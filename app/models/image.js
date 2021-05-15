'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const imageSchema = Schema({
  image: Object,
  imageId: String,
  imageUrl: String
});

module.exports = Mongoose.model('Image', imageSchema);