const userModel = require("../models/user.model");

// third validation --> check all filed are not blank

module.exports.createUser = async ({ username, email, password, role }) => {
  if (!username || !email || !password) {
    throw new Error("All Filed are Required !!");
  }

  const user = await userModel.create({ username, email, password, role });

  return user;
};

// udpate user
module.exports.updateUser = async ({ userId, username, email }) => {
  if (!username || !email) {
    throw new Error("All Filed are required !!");
  }

  const updateUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { username, email },
    { new: true },
  );

  if(!updateUser){
    throw new Error ("User not Found")
  }

  return updateUser;
};


