import express from "express";
import bodyParser from "body-parser";
// import { getProducts, createProduct } from "./mongo.js";
import { PORT_NUMBER } from "./src/utils/constants.js";
import { createProduct, getProducts } from "./mongoose.js";

const app = express();

app.use(bodyParser.json());

app.post("/products", createProduct);
app.get("/products", getProducts);

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port number ${PORT_NUMBER}`);
});
