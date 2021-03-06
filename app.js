const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const analyticRoutes = require('./routes/analytic')
const catRoutes = require('./routes/category')
const orderhRoutes = require('./routes/order')
const keys = require('./config/keys')
const posRoutes = require('./routes/position')

mongoose.connect(keys.mongoURI,{useNewUrlParser: true})
.then(() => console.log('Mongo worked'))
.catch(() => console.log(error))
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/auth',authRoutes)
app.use('/api/analytic',analyticRoutes)
app.use('/api/order',orderhRoutes)
app.use('/api/position',posRoutes)
app.use('/api/category',catRoutes)

module.exports = app