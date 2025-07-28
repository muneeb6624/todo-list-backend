const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile } = require('../controllers/authController');
const { generateSignedUpload, generateSignature } = require('../services/cloudinary/signed-upload');
const protect = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/sign-upload', protect, generateSignedUpload);
// router.post('/sign-params', protect, generateSignature); 
router.put('/users/update-profile', protect, updateUserProfile); 

module.exports = router;