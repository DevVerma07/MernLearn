import express from "express";
import { index, create, store, edit, update, destroy} from "../controllers/user-controller.js";

const router = express.Router();

router.get('/',index);
router.get('/create',create);
router.post('/store',store);
router.get('/edit',edit);
router.post('/update',update);
router.get('/delete',destroy);

export default router;
