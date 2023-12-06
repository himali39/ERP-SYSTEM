const Faculty = require("../models/facultyModel");

const createFaculty = async (req, res) => {
  try {
    const reqbody = req.body;

    /** file upload*/
    if (req.file) {
      reqbody.facultyImg = req.file.filename;
    } else {
      throw new Error("faculty Img is required!");
    }

    const faculty = await Faculty.create(reqbody);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(201).json({
      message: "faculty data create sucessfully !",
      data: faculty,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**Get user data */
const getfaculty = async (req, res) => {
  try {
    // const { id } = req.params;

    const faculty = await Faculty.find();

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json(faculty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = { getfaculty, createFaculty };
