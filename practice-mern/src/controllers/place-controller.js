import HttpError from "../models/http-error.js";
import { v4 as uuid } from "uuid";

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world!",
    location: {
      lat: 40.7484,
      lng: -73.9857,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Eiffel Tower",
    description: "One of the most famous landmarks in France!",
    location: {
      lat: 48.8584,
      lng: 2.2945,
    },
    address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
    creator: "u2",
  },
  {
    id: "p3",
    title: "Statue of Liberty",
    description: "One of the most famous landmarks in the United States!",
    location: {
      lat: 40.6892,
      lng: -74.0445,
    },
    address: "New York, NY 10004, United States",
    creator: "u3",
  },
  {
    id: "p4",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world!",
    location: {
      lat: 40.7484,
      lng: -73.9857,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u3",
  },
];

export const getPlacesById = (req, res, next) => {
  const placeId = req.params.pid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.id === placeId;
  });
  if (!places || places.length === 0) {
    return next(
      new HttpError("could not find a place for the provided id.", 404)
    );
  }
  res.json({ places }); // if not a problem to write {place} => {place: place}
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

export const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace); //push send data to last element and unshift send data to first element

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (req, res, next) => {
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
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};
