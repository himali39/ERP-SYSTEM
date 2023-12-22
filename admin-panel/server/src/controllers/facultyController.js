const Faculty = require("../models/facultyModel");
const csv = require("csvtojson");

/* --------------------------- create faculty data -------------------------- */
const createFaculty = async (req, res) => {
  try {
    const reqbody = req.body;

    /** file upload*/
    reqbody.facultyImg = "";
    if (req.file && req.file != "undefined") {
      reqbody.facultyImg = req.file.filename;
    }
    // else {
    //   throw new Error("faculty Img is required!");
    // }

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

/* ---------------------------- Get faculty data ---------------------------- */
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

/* --------------------------- delete faculty data -------------------------- */
const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty Id already Deleted" });
    }
    const deleteData = await Faculty.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
      // deletedData: deleteData,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/* --------------------------- Update faculty data -------------------------- */
const updateFaculty = async (req, res) => {
  try {
    const id = req.params.id;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty Id  does not exist" });
    }
    if (req.file && req.file != "undefined") {
      req.body.facultyImg = req.file.filename;
    }

    const updateFacultyData = await Faculty.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log("req.body--------------", req.body);

    if (!updateFacultyData) {
      throw new Error("Something went wrong, try again later  ");
    }

    res.status(200).json({
      success: true,
      message: "Faculty update successfully",
      data: updateFacultyData,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/* ----------------------------- csv file upload ---------------------------- */
const importFaculty = (req, res) => {
  try {
    let faculty = [];

    csv()
      .fromFile(req.file.path)
      .then(async (res) => {
        // console.log(res);
        for (let x = 0; x < res.length; x++) {
          faculty.push({
            facultyImg: res[x].facultyImg,
            facultyName: res[x].facultyName,
            facultySubject: res[x].facultySubject,
            facultyAddress: res[x].facultyAddress,
          });

          await Faculty.insertMany(faculty);
        }
      });

    res.status(200).json({
      success: true,
      message: "file uploaded successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getfaculty,
  createFaculty,
  deleteFaculty,
  updateFaculty,
  importFaculty,
};
