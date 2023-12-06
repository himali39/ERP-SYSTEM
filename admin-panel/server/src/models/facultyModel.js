const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema(
  {
    facultyImg: {
      type: String,
    },
    facultyName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    facultySubject: {
      type: String,
      required: true,
    },
    facultyAddress: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   transform: function (doc, data) {
    //     if (data?.facultyImg) {
    //       data.facultyImg = `${process.env.BASE_URL}faculty_images/${data.facultyImg}`;
    //     }
    //   },
    // },
  }
);


const Faculty = mongoose.model("Faculty", FacultySchema);

module.exports = Faculty;
