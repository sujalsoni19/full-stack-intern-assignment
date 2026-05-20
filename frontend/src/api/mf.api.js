import api from "./axios.js";

export const searchFunds = (query) =>
  api.get("/api/search", {
    params: {
      query: query,
    },
  });

export const addtoWatchlist = (data) =>
  api.post("/api/watchlist", data)
