'use strict';
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const Image = require("../models/image");

const ImageStore = {
  configure: function() {
    const credentials = {
      cloud_name: process.env.name,
      api_key: process.env.key,
      api_secret: process.env.secret
    };
    cloudinary.config(credentials);
  },

  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  getImage: async function() {
    const result = await cloudinary.v2.api.resources_by_context(imagefile);
    return result.resources_by_context;
  },

  uploadImage: async function(imagefile) {
    await writeFile('./public/temp.img', imagefile);
    const publicId = Math.random().toString(16).substr(2, 8);
    await cloudinary.v2.uploader.upload('./public/temp.img',{public_id: publicId},
      function(error, result) {console.log(result, error); });
    const newImage = new Image({
      image: cloudinary.v2.api.resources_by_ids(publicId),
      imageId: publicId,
      imageUrl: cloudinary.url(publicId)});
    await newImage.save();
    console.log(cloudinary.url(publicId));
  },

  deleteImage: async function(id) {
    await cloudinary.v2.uploader.destroy(id, {});
  },

};

module.exports = ImageStore;