import { Router } from "express";
import {
  searchMutualFund,
  addtoWatchlist,
  getWatchlistItems,
  deletefromWatchlist,
} from "../controllers/mf.controller.js";

const router = Router();

router.get("/search", searchMutualFund);

router.route("/watchlist").post(addtoWatchlist).get(getWatchlistItems);

router.route("/watchlist/:schemeCode").delete(deletefromWatchlist);

export default router;
