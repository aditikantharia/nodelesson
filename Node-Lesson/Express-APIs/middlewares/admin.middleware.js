module.exports.authAdmin = async (req, res, next) =>{
    const user = req.user // usermiddleware -- retrun req.user


    if(!user || user.role !== "admin"){
        return res.status(401).json({message: "Access Denined !!"})
    }

    next();
}