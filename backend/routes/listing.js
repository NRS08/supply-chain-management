const {
  listing,
  getId,
  updateListed,
  getYourListedItems,
} = require("../controllers/listing");
const { getAllItems } = require("../controllers/listing");

const express = require("express");
const router = express.Router();

router.route("/item").post(listing);
router.route("/items").get(getAllItems);
router.route("/yourItems").get(getYourListedItems);
router.route("/myId").get(getId);
router.route("/update/:id").patch(updateListed);

module.exports = router;
