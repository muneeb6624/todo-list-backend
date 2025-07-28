// Replace your signed-upload.js with this more robust version

const cloudinary = require('cloudinary').v2;

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Generate signature for any parameters sent by the widget
const generateSignature = async (req, res) => {
  try {
    const { params_to_sign } = req.body;
    
    // Sign the exact parameters sent by the widget
    const signature = cloudinary.utils.api_sign_request(
      params_to_sign, 
      process.env.CLOUDINARY_API_SECRET
    );
    
    res.json({ signature });
  } catch (error) {
    console.error('Cloudinary signing error:', error);
    res.status(500).json({ message: 'Failed to generate signature' });
  }
};

// Generate initial upload parameters (simplified)
const generateSignedUpload = async (req, res) => {
  try {
    res.json({
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      folder: 'profile_pics',
      public_id: `user_${req.user._id}_${Date.now()}`,
    });
  } catch (error) {
    console.error('Cloudinary upload params error:', error);
    res.status(500).json({ message: 'Failed to generate upload parameters' });
  }
};

module.exports = {
  generateSignedUpload,
  generateSignature
};