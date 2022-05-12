const Room = require('../models/Room');

const getRooms =  async (req,res) =>{
    try{
        const rooms =  await Room.find();
         return res.json(rooms);
    }catch(err){
        res.status(400).send(err);
    }
};

const createRooms = async (req, res) =>{
    const room = new Room({
        category: req.body.category,
        number: req.body.number,
        floor: req.body.floor,
        capacity: req.body.capacity,
        aviability: req.body.aviability,
        guests: req.body.guests,
        client: req.body.client
    });
    try{
        const savedRoom = await room.save();
        res.send({room_user: room._id});
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports = {createRooms, getRooms};

