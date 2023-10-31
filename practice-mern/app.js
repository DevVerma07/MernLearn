import express from "express";
import bodyParser from "body-parser";
import HttpError from "./src/models/http-error.js";
import placesRouts from "./src/routes/places-routes.js";
import userRoute from "./src/routes/user-route.js";
import mongoose from "mongoose";
import {
  API_VERSION,
  PORT_NUMBER,
  MONGO_DB_URL,
} from "./src/utils/constants.js";

const app = express();

app.use(bodyParser.json());

app.use(API_VERSION, userRoute);
app.use(API_VERSION, placesRouts);

app.use((req, res, next) => {
  const error = new HttpError("Not able to get requested route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://devkumarverma830:zvv1GlomnWHQExuJ@devcluster.w7qnayd.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT_NUMBER, () => {
      console.log(`Server is listening on port number ${PORT_NUMBER}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
