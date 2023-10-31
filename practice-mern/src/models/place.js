import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  creator: { type: String, required: true },
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
