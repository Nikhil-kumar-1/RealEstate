const express = require("express");
const {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  toFav,
  getAllFavorites,
} = require("../controllers/userCntrl");

const router = express.Router();

// Use router.post() for routes that handle POST requests
router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav/", getAllFavorites);

module.exports = { userRoute: router };
