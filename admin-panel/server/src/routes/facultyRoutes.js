const express = require("express");
const {
  getfaculty,
  createFaculty,
  deleteFaculty,
  updateFaculty,
  importFaculty,
  
} = require("../controllers/facultyController");
const { singleFileUpload } = require("../middlwares/upload");

const router = express.Router();

/**Add faculty data */
router.post(
  "/addfaculty",
  singleFileUpload("/faculty_images/", "facultyImg"),
  createFaculty
);

/**Get faculty data list */
router.get("/facultyList", getfaculty);

/** faculty data delete */
router.delete("/deletefaculty/:id", deleteFaculty);

 /* --------------------------- faculty data update -------------------------- */
router.put(
  "/updatefaculty/:id",
  singleFileUpload("/faculty_images/", "facultyImg"),
  updateFaculty
);

 /* --------------------------- upload csv file -------------------------- */
router.post("/importFaculty", singleFileUpload("/facultyfile","file"), importFaculty);


module.exports = router;
