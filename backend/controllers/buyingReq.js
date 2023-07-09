const BuyRequest = require("../modles/BuyRequest");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const buyRequest = async (req, res) => {
  const { Iname, amount, price, buyerName, seller } = req.body;
  if (!Iname || !amount || !price || !buyerName || !seller) {
    throw new BadRequestError("Provide all info");
  }
  if (seller == req.user.userId) {
    throw new BadRequestError("Buyer and Seller should be different");
  }
  req.body.buyerAccount = req.user.account;
  req.body.buyer = req.user.userId;
  // console.log(req.user.userId);
  const request = await BuyRequest.create(req.body);
  res.status(201).json({ request });
};

const getBuyRequests = async (req, res) => {
  let queryRequest = {};
  const { accepted } = req.query;
  if (accepted) {
    queryRequest.accepted = accepted;
  }
  queryRequest.seller = req.user.userId;
  const requests = await BuyRequest.find(queryRequest);
  res.status(201).json({ requests });
};

const getWallet = async (req, res) => {
  res.status(200).json({ account: req.user.account });
};

const deleteRequest = async (req, res) => {
  const { id: reqId } = req.params;
  const { userId } = req.user;
  const request = await BuyRequest.findByIdAndDelete({ _id: reqId });
  if (!request) {
    throw new BadRequestError(`No request with id ${reqId}`);
  }
  res.status(200).send();
};

const updateRequest = async (req, res) => {
  const { id: reqId } = req.params;
  const request = await BuyRequest.findByIdAndUpdate({ _id: reqId }, req.body, {
    runValidators: true,
  });
  if (!request) {
    throw new BadRequestError(`No request with id ${reqId}`);
  }
  res.status(201).json({ request });
};

module.exports = {
  buyRequest,
  getBuyRequests,
  getWallet,
  deleteRequest,
  updateRequest,
};
