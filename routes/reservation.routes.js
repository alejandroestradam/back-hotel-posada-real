const router = require('express').Router();
const {getReservations, createReservation, getReservationsbyEmail, deleteReservation} = require('../controllers/reservationController');
const verify = require('./verifyToken');


router.get('/obtain', getReservations);
router.post('/email', getReservationsbyEmail);
router.post('/create', createReservation);
router.delete('/delete', deleteReservation);


module.exports = router;

