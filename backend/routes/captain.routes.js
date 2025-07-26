const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/middleware.auth');
router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Please enter a valid vehicle plate number'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of car, bike, or auto'),
], captainController.registerCaptain);


router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authcaptain, captainController.getCaptainProfile); 

router.get('/logout', authMiddleware.authcaptain, captainController.logoutCaptain); 
module.exports = router;
