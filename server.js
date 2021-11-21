// https://www.positronx.io/express-validator-tutorial-with-input-validation-examples/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser());
app.use(session({
    secret: 'password',
    saveUninitialized: false,
    resave: false
}));

const exphbs = require('express-hbs');

// Serve static resources
app.use('/public', express.static('public'));

// Render View
app.engine('hbs', exphbs({
    extname: 'hbs',
    // defaultLayout: 'layout',
    // layoutDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// User router
const user = require('./routes/user.routes');
// Initiate API
app.use('/user', user)


// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})