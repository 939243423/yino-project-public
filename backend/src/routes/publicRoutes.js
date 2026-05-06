const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/banners', publicController.getBanners);
router.get('/news', publicController.getNews);
router.get('/news/:id', publicController.getNewsDetail);
router.get('/jobs', publicController.getJobs);
router.post('/inquiry', publicController.submitInquiry);

module.exports = router;
