import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Database is connected!");
    })
    .catch((err) => {
      console.log("Database error occured!");
    });
};

export default connect;
