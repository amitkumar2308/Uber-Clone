const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthorized access'});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if(isBlacklisted){
        return res.status(401).json({message:'Token is blacklisted'});  
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message:'Invalid token'});
    }
}

module.exports.authcaptain = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthorized access'});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized access'});  
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    } catch (error) {
        res.status(401).json({message:'Invalid token'});
    }
}