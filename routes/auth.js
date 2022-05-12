const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');
const {signupValidation, loginValidation} = require('../validation');

router.post('/getclient', async (req, res) =>{
    try{
        const client =  await Client.find({ email: req.body.email});
        const data = {
            name: client[0].name,
            email: client[0].email,
            cellphone: client[0].cellphone,
            country: client[0].country
        }
         return res.json(data);
    }catch(err){
        res.status(400).send(err);
    }
});
router.put('/updateclient', async (req, res) =>{
    try{
        console.log('body: ', req.body);
        const updatedClient =  await Client.findByIdAndUpdate(req.body._id, req.body,    
        {
            new: true,
        });
        console.log('Client updated');
         return res.status(204).send('Client Updated');
    }catch(err){
        res.status(400).send(err);
    }
});

router.put('/updatepassword', async(req, res) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log('body: ', hashedPassword);
        await Client.findByIdAndUpdate(req.body._id, req.body.password);
        console.log('Password updated');
         return res.status(200).send('Password Updated');
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/signup', async (req,res) =>{
    //Validation
    const {error} = signupValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await Client.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Create a new client
    const client = new Client({
        name: req.body.name,
        email: req.body.email,
        cellphone: req.body.cellphone,
        country: req.body.country,
        role: 'client',
        password: hashedPassword
    });
    try{
        const savedClient = await client.save();
        res.send({client_user: client._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) =>{
        //Validation
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        // Checking if the email exists
        const client = await Client.findOne({email: req.body.email});
        if(!client) return res.status(400).send('Invalid Email or Password');

        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, client.password);
        if(!validPass) return res.status(400).send('Invalid Email or Password');
        console.log(client);
        //Create and assing a token
        const token = jwt.sign({_id: client._id, email: client.email, name: client.name, role: client.role}, process.env.TOKEN_SECRET);
        const data = {
            token: token,
            clientName: client.name,
            role: client.role,
            email: client.email
        }
        res.header('auth-token', token).send(data);

});

module.exports = router;