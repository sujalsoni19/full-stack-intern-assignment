import { Router } from "express";
import { searchMutualFund } from "../controllers/mf.controller.js";

const router = Router();

router.get("/search", searchMutualFund);

export default router;
