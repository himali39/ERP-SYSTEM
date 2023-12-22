const multer = require("multer");
const fs = require("fs");
const path = require("path");
const express = require("express");

const singleFileUpload = (basePath, name) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dynamicPath = path.join(__dirname, "../public" + basePath);
      console.log(dynamicPath);
      // Check if the path exists, if not, create it
      if (!fs.existsSync(dynamicPath)) {
        fs.mkdirSync(dynamicPath, { recursive: true });
      }
      cb(null, dynamicPath);
    },

    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + file.originalname);
    },
  });

  return multer({
    storage: storage,
  }).single(name);
};

module.exports = { singleFileUpload };
