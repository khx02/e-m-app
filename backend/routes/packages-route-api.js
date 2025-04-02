const express = require('express');
const router = express.Router();
const path = require('path');

const packageCont = require(path.join(__dirname, '..', 'controllers', 'package-cont.js'));

// list all packages
router.get('/', packageCont.getAll);
// update package
router.put('/', packageCont.updatePackage);

// add package
router.post('/add', packageCont.createPackage);

// delete package
router.get('/delete/:id', packageCont.deletePackage);

module.exports = router;