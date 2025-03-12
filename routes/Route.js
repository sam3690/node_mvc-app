const express = require('express');
const controller = require('../controllers/controller');


const router = express.Router();

// Homepage route
router.get('/', controller.showDashboard);
// router.get('/', controller.showDash);

module.exports = router;