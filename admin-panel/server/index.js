const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const generalRoutes = require("./src/routes/generalRoutes.js");
const facultyRoutes = require("./src/routes/facultyRoutes.js");

/**data imports */
// import User from "./src/models/Usermodel.js";
// import OverallStat from "./src/models/OverallStatmodel.js";
// import Transaction from "./src/models/Transactionmodel.js";
// const Faculty =require( "./src/models/facultyModel.js");
//  const Product = require("./src/models/ProductModel.js");

const {
  // dataUser,
  // dataOverallStat,
  // dataTransaction,
  // datafaculty,
  // dataProduct,
} = require("./src/data/data.js");

/** configuration*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

/**UPLOAD FILE */
app.use(express.static(path.join(__dirname, "./src/public")));

/**ROUTES */
app.use("/general", generalRoutes);
app.use("/faculty", facultyRoutes);

/**MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
    // OverallStat.insertMany(dataOverallStat);
    //  Transaction.insertMany(dataTransaction);
    //  Faculty.insertMany(datafaculty);
    //  Product.insertMany(dataProduct);
  })
  .catch((error) => console.log(`${error} did not connect`));
