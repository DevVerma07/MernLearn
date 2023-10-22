import express from "express";
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
router.post("/", createPlace);
router.patch("/:pid", updatePlace);
router.delete("/:pid", deletePlace);

export default router; //in node we use  module.exports = router;
