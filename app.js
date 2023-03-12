require('dotenv').config(); // to use .env file to store our environment variables

// Import for node packages
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose")

// Import for ROUTES
const authRoutes = require('./api/router/auth')
const audioRoutes = require('./api/router/audio')


const app = express();


// Middlewares
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(bodyParser.json());
app.use(cookieParser());



// Routes
app.use('/api', authRoutes)
app.use('/api', audioRoutes)




// Starting Database
mongoose.connect(`mongodb://localhost:27017/musicPlayer`,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    })
    .then(() => {
        // DB connected
        console.log('DB Connected')
        // Starting the server
        const serverPort = 8000;
        app.listen(serverPort, (err) => {
            if(err){
                console.log(`Server not started due to following error:\n${err.message}`)
            }else{
                console.log(`Server is running on port ${serverPort}`)
            }
        })
    })
    .catch(err => {
        // DB not connected
        console.log(`DB not connected due to following error:\n${err.message}`)
    })