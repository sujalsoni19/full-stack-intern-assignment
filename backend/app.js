import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));

import Router from "./routes/mf.route.js";

//http://localhost:4000
app.use("/", Router);

export default app;
