const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/upload', verifyToken, photoController.uploadPhoto);
router.get('/', verifyToken, photoController.getPhotos);

module.exports = router;
