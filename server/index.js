const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
require('./dbs/connection');
const UserRouter = require('./routes/userRouter');

/* constant variables here */
const PORT = process.env.PORT | 5000;

/* set up express and initializing*/
const app = express();

/* middlewares */
app.use(express.json());
app.use(cors());

/* API or using all routes from route folder */
app.get('/', (req, res) => res.send("HELLO FROM BACKEND"))
app.use("/users", UserRouter);


/* set up port for listening to server */
app.listen(PORT, () => {
    console.log(`The server is listening on ${PORT}`);
});


