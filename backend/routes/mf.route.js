import { Router } from "express";
import {
  searchMutualFund,
  addtoWatchlist,
  getWatchlistItems,
  deletefromWatchlist,
  getFundDetails,
} from "../controllers/mf.controller.js";

const router = Router();

router.get("/search", searchMutualFund);

router.route("/watchlist").post(addtoWatchlist).get(getWatchlistItems);

router
  .route("/watchlist/:schemeCode")
  .get(getFundDetails)
  .delete(deletefromWatchlist);

export default router;
