/**
 * Express module
 *
 * @type {Express} express
 */
const express = require('express');
/**
 * Router module
 *
 * @type {Router} router
 */
const router = express.Router();

const driverCont = require('../controllers/driver-cont.js');

// add driver
router.post('/add', driverCont.createDriver);
// update driver
router.put('/', driverCont.updateDriver);
// delete driver
router.get('/delete', driverCont.deleteDriver);

// list all drivers
router.get('/', driverCont.getAll);

module.exports = router;

