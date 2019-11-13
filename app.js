const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
//мои

const roomRoutes = require('./routes/room')
const calenarRoutes = require('./routes/calendar')


//mongoose.connect('mongodb://localhost/EtTest',
mongoose.connect('mongodb+srv://admin:1qaz1qaz@cluster0-wzuxj.mongodb.net/Eltest',
    {useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true})
  .then(()=>console.log('Mongo Connect'))
  .catch(error => console.log(error))

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/rooms', roomRoutes)
app.use('/calendar', calenarRoutes)
module.exports = app
