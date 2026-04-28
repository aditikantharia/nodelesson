const mongoose = require("mongoose");

function conectToDb() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("📊 Database Conneted");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = conectToDb;
