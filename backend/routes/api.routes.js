const express = require('express');
const router = express.Router();
const MilkingController = require('../controller/milking.controller');
const {validateCreateMilkingSession} = require('../request/milking.request');

router.post('/milking/create', validateCreateMilkingSession, MilkingController.createMilkingSession);
router.get('/milking/get', MilkingController.getMilkingSessions)


module.exports = router;