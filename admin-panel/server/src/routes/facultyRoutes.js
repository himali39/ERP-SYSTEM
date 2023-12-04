const express = require("express");
const {
  getfaculty,
  createFaculty,
} = require("../controllers/facultyController");
const { upload } = require("../middlwares/upload");

const router = express.Router();

/**Add faculty data */
router.post("/addfaculty", upload.single("facultyImg"), createFaculty);

/**Get faculty data list */
router.get("/facultyList", getfaculty);

module.exports = router;
