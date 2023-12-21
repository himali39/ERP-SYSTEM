const express = require("express");
const {
  getfaculty,
  createFaculty,
  deleteFaculty,
  updateFaculty,
  importFaculty,
  
} = require("../controllers/facultyController");
const { upload } = require("../middlwares/upload");

const router = express.Router();

/**Add faculty data */
router.post("/addfaculty", upload.single("facultyImg"), createFaculty);

/**Get faculty data list */
router.get("/facultyList", getfaculty);

/** faculty data delete */
router.delete("/deletefaculty/:id", deleteFaculty);

/** faculty data update */
router.put("/updatefaculty/:id", upload.single("facultyImg"), updateFaculty);

router.post("/importFaculty", upload.single("file"), importFaculty);


module.exports = router;
