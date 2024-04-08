import express from "express";
import dotenv from "dotenv";
import connect from "./config/dbconnect";
import CustomError from "./utils/createError";
import errorHandlerModule from "./middleware/errorHandler";

const app = express();
app.use(express.json());
dotenv.config({ path: "config/config.env" });

app.use(errorHandlerModule);

app.use("*", (req, res, next) => {
  const error = new CustomError("Invalid Route in this server.", 404);
  return next(error);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect();
  console.log("Port 3000 is connected!");
});
