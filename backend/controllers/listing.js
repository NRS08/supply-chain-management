const ProductListing = require("../modles/ProductListing");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const listing = async (req, res) => {
  const { name, role, Iname, harvestDate, amount, contact } = req.body;
  if (!name || !role || !Iname || !harvestDate || !amount || !contact) {
    throw new BadRequestError("Provide all info");
  }
  req.body.createdBy = req.user.userId;
  // console.log(req.user.userId);
  const item = await ProductListing.create(req.body);
  res.status(201).json({ item });
};

const getAllItems = async (req, res) => {
  let queryProducts = {};
  const { Iname, status, ID } = req.query;
  if (Iname) {
    queryProducts.Iname = { $regex: Iname, $options: "i" };
  }
  if (status) {
    queryProducts.status = status;
  }
  if (ID) {
    queryProducts.prodID = ID;
  }

  let results = ProductListing.find(queryProducts);

  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 10;
  // const skip = (page - 1) * limit;
  // results.skip(skip).limit(limit);

  const items = await results;
  res.status(200).json({ items });
};

const getYourListedItems = async (req, res) => {
  let queryProducts = {};
  queryProducts.createdBy = req.user.userId;
  const items = await ProductListing.find(queryProducts);
  res.status(200).json({ items });
};

const getId = async (req, res) => {
  res.status(200).json({ id: req.user.userId });
};

const updateListed = async (req, res) => {
  const { id } = req.params;
  const item = await ProductListing.findOneAndUpdate({ prodID: id }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!item) {
    throw new BadRequestError(`No item with id ${id}`);
  }
  res.status(201).json({ item });
};

module.exports = {
  listing,
  getAllItems,
  getYourListedItems,
  getId,
  updateListed,
};
