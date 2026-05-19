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

// import userRouter from "./routes/user.route.js";

// //http://localhost:4000/api/v1/users/register
// app.use("/api/users", userRouter);

export default app;
