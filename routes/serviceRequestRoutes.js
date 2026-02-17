const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controller/serviceRequestController');

// ✅ FIXED: Changed paths to '/' because the base path is already set in server.js
router.post('/', serviceRequestController.createServiceRequest);
router.get('/', serviceRequestController.getServiceRequests);

module.exports = router;