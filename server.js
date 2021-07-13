const bodyParser = require('body-parser');
const connectDB = require('./server/database/connection');
const dotenv = require('dotenv');
const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path')
const learnRouter = require('./server/routes/learn')
const relationshipRouter = require('./server/routes/fakeSocial')

// ----- SETTINGS-------//

//express setup
const app = express();

// enviroment variables config
dotenv.config( { path:'config.env' } )

// Body Parser config
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())

// Morgan setup
app.use(morgan('tiny'))

// View engine
app.set('view engine', 'hbs')
app.engine('hbs', hbs( {extname:'hbs'} ))

// Assets setup
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))


// Port setupp
const PORT = process.env.PORT || 8080;

// URL SETUP
app.use('/view', learnRouter)
app.use('/api', relationshipRouter)



//------ END SETTINGS-----//

// DATABASE CONNECTION
connectDB(() =>
    // SERVER LISTENING.....
    app.listen(PORT, async () => console.log(`Server is running at http://localhost:${PORT}`))
)

