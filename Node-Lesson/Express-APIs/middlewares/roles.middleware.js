module.exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user)
    if (!req.user || !roles.includes(req.user.role)) {
      throw new Error("Access Denied !!");
    }
    next();
  };
};
