const userModel = require("../models/user.model");
const adminService = require("../services/admin.service");

// all user
module.exports.Alluser = async (req, res) => {
  try {
    const users = await adminService.getAllUser();

    return res.status(200).json({ msg: "Fetch All Users", users });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete user
module.exports.deleteUser = async (req, res) => {
  try {
    const deleted_user = await adminService.deleteUser(req.params.id);

    if (!deleted_user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ message: "user Deleted Sucessfully", deleted_user});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


// update user role
module.exports.updateRole = async (req, res)=>{
try {
  const {role} = req.body;


  const userId =req.params.id;

  if(req.user.role !== "admin"){
    return res.status(401).json({message: "Acess Denied!!"})
  }

  const user = await adminService.updateUserRole({userId, role})

  return res.status(200).json({messaeg: "update role of user", user})

} catch (err) {
  return res.status(400).json({message: err.message})
}
}