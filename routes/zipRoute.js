const express= require('express');
const {handleExtraction, handleHome} = require('../controllers/zipHandler');

const router= express.Router();
router.post('/:shortId', handleExtraction);
router.get('/',handleHome);

module.exports = router;