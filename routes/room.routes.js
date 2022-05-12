const router = require('express').Router();
const {getRooms, createRooms} = require('../controllers/roomController');
const verify = require('./verifyToken');


router.get('/obtain', verify, getRooms);
router.post('/create', verify, createRooms);

module.exports = router;