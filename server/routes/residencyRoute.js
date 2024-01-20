const express = require("express");
const {
  createResidency,
  getAllResidencies,
  getResidency,
} = require("../controllers/resdCntrl");
const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies); // Added a leading slash
router.get("/:id", getResidency);
module.exports = { residencyRoute: router };
