import HttpError from "../models/http-error.js";
import { v4 as uuid } from "uuid";
import { validationResult } from "express-validator";
import Place from "../models/place.js";

export const getPlacesById = async (req, res, next) => {
  const placeId = req.params.pid;
  
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!place) {
    return next(
      new HttpError("could not find a place for the provided id.", 404)
    );
  }
  res.json({ place });
};

export const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("could not find any places for the provided user id.", 404)
    );
  }
  res.json({ places }); // if not a problem to write {places} => {places: places}
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422); //422 is validation error
  }
  const { title, description, location, address, creator } = req.body;
  const createdPlace = new Place({
    title,
    description,
    location,
    address,
    creator,
    image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
  });
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422); //422 is validation error
  }
  const placeId = req.params.pid;
  const { title, description, creator } = req.body;

  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatePlace.title = title;
  updatePlace.description = description;
  updatePlace.creator = creator;

  DUMMY_PLACES[placeIndex] = updatePlace;
  res.status(200).json({ place: updatePlace });
};

export const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};
