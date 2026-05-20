import api from "./axios.js";

export const searchFunds = (query) =>
  api.get("/api/search", {
    params: {
      query: query,
    },
  });

export const addtoWatchlist = (data) => api.post("/api/watchlist", data);

export const getWatchlistItems = () => api.get("/api/watchlist");

export const deleteWatchListItem = (schemeCode) =>
  api.delete(`/api/watchlist/${schemeCode}`);

export const getFundDetails = (schemeCode) =>
  api.get(`/api/watchlist/${schemeCode}`);
