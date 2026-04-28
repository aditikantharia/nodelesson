const mongoose = require("mongoose");

function ConnectToDB() {
  mongoose
    .connect(process.env.MONGODB_STRING)
    .then(() => {
      console.log("📊 Database Connect Successfully ");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = ConnectToDB;
