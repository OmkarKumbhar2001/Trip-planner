import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: "206kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import tripRouter from "./routes/trip.routes.js";
import taskRouter from "./routes/task.routes.js";
import packingItemRouter from "./routes/packingItem.routes.js";
import reminderRouter from "./routes/reminder.routes.js";
import itineraryDayRouter from "./routes/itineraryDay.routes.js";

//routes import
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/trips", tripRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/packing-items", packingItemRouter);
app.use("/api/v1/reminders", reminderRouter);
app.use("/api/v1/itinerary-days", itineraryDayRouter);
//routes declaration
app.use((err, req, res, next) => {
  console.error(err); // log for debugging

  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

export { app }