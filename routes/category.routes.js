const router = require('express').Router();
const {getCategories, createCategory} = require('../controllers/categoryController');
const verify = require('./verifyToken');


router.get('/obtain', getCategories);
router.post('/create', verify, createCategory);

module.exports = router;