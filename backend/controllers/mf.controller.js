import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/apiResponse.js";
import api from "../config/axios.js";

const searchMutualFund = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const response = await api.get(`https://api.mfapi.in/mf/search?q=${query}`);

  if (!response.data || response.data.length === 0) {
    throw new ApiError(404, "Couldn't find matching results");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response.data, "Result fetched successfully"));
});

export {searchMutualFund};
