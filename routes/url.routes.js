const express = require('express');
const router = express.Router();
const {generateShortUrl,redirectUrl,urlAnalytics} = require('../controllers/handleUrlShort')

router.post('/' , generateShortUrl);
router.get('/:shortId' , redirectUrl);
router.get('/analytics/:shortId' , urlAnalytics);

module.exports = router;