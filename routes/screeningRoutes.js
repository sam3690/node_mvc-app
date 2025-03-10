const express = require('express');
const screeningController = require('../controllers/screeningController');

const router = express.Router();

// Homepage route
router.get('/', screeningController.showDashboard);

module.exports = router;