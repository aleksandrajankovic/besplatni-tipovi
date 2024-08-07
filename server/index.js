import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tipsRouter from "./routes/tips.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true })); //parsiranje dolazecih json podataka
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//setup ruta
app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tip", tipsRouter);

const MONGODB_URL = process.env.MONGO_URL;
const port = process.env.PORT;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Baza podataka je uspešno povezana!");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
