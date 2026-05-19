import mongoose, { Schema } from "mongoose";

const watchListSchema = new Schema(
  {
    schemeCode: {
      type: Number,
      unique: true,
      required: true,
    },
    schemeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const WatchList = mongoose.model("WatchList", watchListSchema);
