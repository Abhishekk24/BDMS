const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const logOutRoute = require('./routes/logout');


//connect to db
app.use(cors());


mongoose.connect("mongodb://localhost:27017/bdms" , ()=>{
    console.log("Connected To server");
})

app.use(express.json());



app.use('/api/user', authRoute);
app.use('/api/posts',postRoute);
app.use('/api/logout',logOutRoute);



app.listen(4000,()=>{
    console.log("Server Is Running ");
})