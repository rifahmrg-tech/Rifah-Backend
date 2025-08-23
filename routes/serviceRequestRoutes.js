const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controller/serviceRequestController');

router.post('/service-requests', serviceRequestController.createServiceRequest);
router.get('/service-requests', serviceRequestController.getServiceRequests);

module.exports = router;