const adminService = require("../services/admin.service");

// all user
module.exports.AllUser = async (req, res) => {
  try {
    const users = await adminService.allUser();

    if (!users) {
      return res.status(404).json({ message: "Users not Found !!" });
    }

    return res
      .status(200)
      .json({ message: "All Users Fetch Sucessfully ", users });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// delete single user
module.exports.DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await adminService.deleteUser(id);

    if (!deleteUser) {
      return res.status(404).json({ message: "User Not Found !!" });
    }

    return res.status(200).json({ message: "user Deleted Sucessfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// update user role
module.exports.UpdateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const userId = req.params.id;

    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Access Denied !!" });
    }

    const user = await adminService.updateRole({ userId, role });

    return res.status(200).json({ message: "update role of user", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
