import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/apiResponse.js";
import api from "../config/axios.js";
import { WatchList } from "../models/watchlist.model.js";

const searchMutualFund = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const response = await api.get(`/mf/search?q=${query}`);

  if (!response.data || response.data.length === 0) {
    throw new ApiError(404, "Couldn't find matching results");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response.data, "Result fetched successfully"));
});

const addtoWatchlist = asyncHandler(async (req, res) => {
  const { schemeCode, schemeName } = req.body;

  if (!schemeCode || !schemeName) {
    throw new ApiError(400, "scheme code and name are required");
  }

  const existingitem = await WatchList.findOne({ schemeCode });

  if (existingitem) {
    throw new ApiError(409, "Item already exists in the watchlist");
  }

  const item = await WatchList.create({ schemeCode, schemeName });

  if (!item) {
    throw new ApiError(500, "item couldn't be added to watchlist");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, item, "item added successfully"));
});

const getWatchlistItems = asyncHandler(async (req, res) => {
  const items = await WatchList.find();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        items,
        "All items of watchlist fetched successfully",
      ),
    );
});

const deletefromWatchlist = asyncHandler(async (req, res) => {
  const { schemeCode } = req.params;

  if (!schemeCode) {
    throw new ApiError(400, "schemeCode is required");
  }

  const response = await WatchList.findOneAndDelete({ schemeCode });

  if (!response) {
    throw new ApiError(404, "Item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "item deleted successfully"));
});

const getFundDetails = asyncHandler(async (req, res) => {
  const { schemeCode } = req.params;

  if (!schemeCode) {
    throw new ApiError(400, "Scheme code required");
  }

  const response = await api.get(`/mf/${schemeCode}`);

  if (!response.data) {
    throw new ApiError(404, "Fund not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, response.data, "Fund details fetched successfully"),
    );
});

export {
  searchMutualFund,
  addtoWatchlist,
  getWatchlistItems,
  deletefromWatchlist,
  getFundDetails,
};
