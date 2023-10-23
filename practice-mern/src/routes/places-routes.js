import express from "express";
import { check } from "express-validator";

import {
  createPlace,
  deletePlace,
  getPlacesById,
  getPlacesByUserId,
  updatePlace,
} from "../controllers/place-controller.js";

const router = express.Router();

router.get("/:pid", getPlacesById);

router.get("/creator/:uid", getPlacesByUserId);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength(5).not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  createPlace
); //middleware validation
router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength(5).not().isEmpty(),
  ],
  updatePlace
);
router.delete("/:pid", deletePlace);

export default router; //in node we use  module.exports = router;
