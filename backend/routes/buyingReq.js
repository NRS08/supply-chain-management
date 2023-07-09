const {
  buyRequest,
  getBuyRequests,
  getWallet,
  deleteRequest,
  updateRequest,
} = require("../controllers/buyingReq");

const express = require("express");
const router = express.Router();

router.route("/request").post(buyRequest);
router.route("/requests").get(getBuyRequests);
router.route("/wallet").get(getWallet);
router.route("/delete/:id").delete(deleteRequest);
router.route("/update/:id").patch(updateRequest);

module.exports = router;
