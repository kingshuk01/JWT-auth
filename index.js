const express  = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()



mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser :true},
    ()=>{console.log("connected");
});


app.use(express.json());


//routes



//middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


app.listen(3000, () => console.log('Server Up and dauding'))