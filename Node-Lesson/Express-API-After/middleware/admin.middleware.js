module.exports.authAdmin = async (req, res, next) => {
  const user = req.user; // user middleware (req.user) --> use req.user in admin

  if (!user || user.role !== "admin") {
    return res.status(401).json({ message: "Access Denind" });
  }

  next();
};
