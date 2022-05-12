const express = require('express');
const app = express ();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


/* It allows the server to accept requests from other domains. */
//app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000",
  };
  app.use(cors(corsOptions));

//Routes
const authRoute = require('./routes/auth');
const reservationRoute = require('./routes/reservation.routes');
const roomRoute = require('./routes/room.routes');
const categoryRoute = require('./routes/category.routes');

dotenv.config();

//Database conection
/*mongoose.connect(process.env.DB_CONNECT, {useNewUrlsParser: true}, ()=>console.log('conected to db!'));*/
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
  })
  .then((db) => console.log(`DataBase is connected`))
  .catch((err) => console.log(err));

//Middleware
app.use(express.json());

//Routes Middlewares
app.use('/api/client', authRoute);
app.use('/api/reservations', reservationRoute);
app.use('/api/rooms',roomRoute);
app.use('/api/categories',categoryRoute);
app.listen(4000, () => console.log('Server up and running'));