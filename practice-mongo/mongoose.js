import mongoose from "mongoose";
import Product from "./src/models/product.js";
import { MONGO_URI } from "./src/utils/constants.js";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch(() => {
    console.log("connection failed");
  });

export const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  const result = await createdProduct.save();
  //   console.log(typeof createdProduct._id);
  res.json(result);
};
export const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};
