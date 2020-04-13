/*****************************
 * NODE MODULES 
 *****************************/

// Require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')

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

/*****************************
 * ROUTES 
 *****************************/
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