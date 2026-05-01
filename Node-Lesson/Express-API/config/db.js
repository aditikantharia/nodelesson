const mongoose = require("mongoose");
// const dbgr = require("debug")("development:server");
// const config = require("config");

function connectToDB() {
  return mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("📊 Mongodb Connected");
  });
}

// function connetToDB() {
//   mongoose
//     .connect(`${config.get("MongoDB_URL")}/ecomerce`)
//     .then(() => {
//       dbgr("Mongodb Conected");
//     })
//     .catch((err) => dbgr(err));
// }

module.exports = connectToDB;
