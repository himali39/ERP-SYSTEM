const multer = require("multer");
const fs = require("fs");
const path = require("path");

/** Image upload using disk storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname, "../public/faculty_images"))
    // if (file.fieldname == "facultyImg") {
    //   fs.mkdirSync(path.join(__dirname, "../public/faculty_images"), {
    //     recursive: true,
    //   });
    //   cb(null, path.join(__dirname, "../public/faculty_images"));
    // }
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  //   const ext = path.extname(file.originalname);
  //   if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".webp") {
  //     cb("Only .png, .jpg, .jpeg and .webp format are allowed!");
  //   }
  //   cb(null, new Date().getTime() + ext);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = { upload };
