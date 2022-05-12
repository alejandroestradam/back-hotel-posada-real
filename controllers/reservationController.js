const Reservation = require('../models/Reservation');
const mailer = require('../mailer');

const getReservations =  async (req,res) =>{
    try{
        const reservations =  await Reservation.find();
         return res.json(reservations);
    }catch(err){
        res.status(400).send(err);
    }
};
const getReservationsbyEmail =  async (req,res) =>{
    try{
        const reservations =  await Reservation.find({ email: req.body.email});
         return res.json(reservations);
    }catch(err){
        res.status(400).send(err);
    }
};

const createReservation = async (req, res) =>{
    console.log(req.body);
    const reservation = new Reservation({
        email: req.body.email,
        guests: req.body.guests,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        roomType: req.body.roomType,
        cost: (req.body.cost * 1.16).toFixed(2),
        cardnumber: req.body.number,
        cardname: req.body.name
    });
    try{
        
        const savedReservation = await reservation.save();

        //send an email to the client with the transaction details
        let textMail =
        "Reservation number: " + savedReservation._id +"\n" +
        "Initial date: " + req.body.startDate +"\n" +
        "Final date: " + req.body.endDate +"\n" +
        "Room Type: " + req.body.roomType + "\n" +
        "Total Guests: " + req.body.guests + "\n" +
        "Total: $" + req.body.cost + "\n" +
        "If there are any mistakes, please contact us" + "\n" +
        "Posada Real Hotel"

        let mailerOptions = {
            emailC: req.body.email,
            subjectC: "Reservation Information - Posada Real",
            textC: textMail
        }

        mailer(mailerOptions)

        console.log('reservation created');
        res.send(savedReservation);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
const deleteReservation = async (req, res) =>{
    console.log(req.body)
    try{
        const reservationId = req.body._id;
        await Reservation.findByIdAndDelete(reservationId);
        res.status(200).send('Reservation deleted');
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

}

module.exports = {createReservation, getReservations, getReservationsbyEmail, deleteReservation};