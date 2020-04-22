/*****************************
 * NODE MODULES 
 *****************************/

// Require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')
let flash = require('connect-flash')
let session = require('express-session')

// Create an app instance
let app = express()

/*****************************
 * SETTINGS / MIDDLEWARE
 *****************************/

// Set template lang to EJS
app.set('view engine', 'ejs')

// Tell express to use the layouts module
app.use(layouts)

// Set up the static folder
app.use(express.static('static'))

// Decrypt the variables coming in via POST routes (from form tags)
app.use(express.urlencoded({ extended: false }))

// Set up sessions
app.use(session({
    secret: 'any string is fine',
    resave: false,
    saveUninitialized: true
}))

// Set up connect-flash for the flash alert messages (depends on session, MUST come after session is declared)
app.use(flash())

// Custom middleware - make certain variables available to EJS pages through locals
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    next()
})

/*****************************
 * ROUTES 
 *****************************/
// Controllers
app.use('/auth', require('./controllers/auth'))

// Create a home page route
app.get('/', (req, res) => {
    res.render('home')
})

// Create a wildcard (catch-all) route. Put it at the BOTTOM of routes
app.get('*', (req, res) => {
    res.render('error')
})

/*****************************
 * LISTEN
 *****************************/

// Pick a port to listen on
app.listen(3000)