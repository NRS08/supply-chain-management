require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const listingRouter = require("./routes/listing");
const requestRouter = require("./routes/buyingReq");
const connectDB = require("./db/connect");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const authenticateUser = require("./middlewares/authenticateUser");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const { buyRequest } = require("./controllers/buyingReq");
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Supply Chain Management API");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listing", authenticateUser, listingRouter);
app.use("/api/v1/buying", authenticateUser, requestRouter);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listining on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
