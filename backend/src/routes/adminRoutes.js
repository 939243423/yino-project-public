const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Protect all admin routes - only admins allowed
router.use(verifyToken);
router.use(isAdmin);

// Upload
router.post('/upload', upload.single('file'), adminController.uploadImage);

// Banners
router.get('/banners', adminController.getBanners);
router.post('/banners', adminController.createBanner);
router.put('/banners/:id', adminController.updateBanner);
router.delete('/banners/:id', adminController.deleteBanner);

// News
router.get('/news', adminController.getNews);
router.post('/news', adminController.createNews);
router.put('/news/:id', adminController.updateNews);
router.delete('/news/:id', adminController.deleteNews);

// Jobs
router.get('/jobs', adminController.getJobs);
router.post('/jobs', adminController.createJob);
router.put('/jobs/:id', adminController.updateJob);
router.delete('/jobs/:id', adminController.deleteJob);

// Users
router.get('/users', adminController.getUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Translation
router.post('/translate', adminController.translate);

// Inquiries
router.get('/inquiries', adminController.getInquiries);
router.delete('/inquiries/:id', adminController.deleteInquiry);

module.exports = router;
