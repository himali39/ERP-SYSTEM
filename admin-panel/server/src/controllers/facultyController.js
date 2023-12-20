const Faculty = require("../models/facultyModel");

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

/**Get faculty data */
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

/**delete faculty data */
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

/**delete faculty data */
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

    console.log("req.body--------------",req.body);
    
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("🚀  userId:", req.params.userId);

    const UserExi = await Faculty.findById(userId);
    
       if (!UserExi) {
      throw new Error("User data not found");
    }
    const updatedata= await Faculty.findByIdAndUpdate(userId, req.body, { new: true });

    console.log("🚀 ~~ req.body:", req.body)

    console.log("🚀 ~ updatedata:", updatedata);

    res.status(200).json({
      success: true,
      message: "User details Update succesfully!",
  
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
  updateUser,
};
