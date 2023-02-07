const uuid = require("uuid").v4;

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the famous",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: "New York",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("This place not found id", 404);
  }
  res.json(place);
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!place) {
    return next(new HttpError("This place not found users id", 404));
  }
  res.json(place);
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body; //const title = req.body.title

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

module.exports = { getPlaceById, getPlaceByUserId, createPlace };
