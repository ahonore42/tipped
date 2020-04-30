/*****************************
 * NODE MODULES 
 *****************************/

 // Add in environment variables
 require('dotenv').config()
 

// Require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')
let flash = require('connect-flash')
let session = require('express-session')
const axios = require('axios');
let COCKTAIL_API_KEY = process.env.COCKTAIL_API_KEY
// Create an app instance
let app = express()
//console.log('This is the API key', COCKTAIL_API_KEY)
// Include passpart via the passport config file
let passport = require('./config/passportConfig')
let baseUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/'
let methodOverride = require('method-override')

/*****************************
 * SETTINGS / MIDDLEWARE
 *****************************/

app.use(require('morgan')('dev'));
// Set template lang to EJS
app.set('view engine', 'ejs')

// Tell express to use the layouts module
app.use(layouts)

// Set up the static folder
app.use(express.static('static'))

// Decrypt the variables coming in via POST routes (from form tags)
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))
// Set up sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// Set up connect-flash for the flash alert messages (depends on session, MUST come after session is declared)
app.use(flash())

// Set up passport (depends on session; must come after it)
app.use(passport.initialize())
app.use(passport.session())


// Custom middleware - make certain variables available to EJS pages through locals
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next()
})

/*****************************
 * ROUTES 
 *****************************/
// Controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/drinks', require('./controllers/drinks'))

const backgroundImage = (drink) => {
    switch (drink) {
        case 'Ordinary Drink': 
            return 'https://www.thecocktaildb.com/images/media/drink/dms3io1504366318.jpg'
            break;

        case 'Cocktail': 
            return 'https://www.thecocktaildb.com/images/media/drink/ec2jtz1504350429.jpg'
            break;

         case 'Milk / Float / Shake': 
            return 'https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg'
            break;

        case 'Cocoa': 
            return 'https://www.thecocktaildb.com/images/media/drink/pra8vt1487603054.jpg'
            break;

        case 'Shot': 
            return 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg'
            break;

        case 'Coffee / Tea': 
            return 'https://www.thecocktaildb.com/images/media/drink/sywsqw1439906999.jpg'
            break;

        case 'Punch / Party Drink': 
            return 'https://www.thecocktaildb.com/images/media/drink/wyrsxu1441554538.jpg'
            break;
        
        case 'Beer':
            return 'https://www.thecocktaildb.com/images/media/drink/qywpvt1454512546.jpg'
            break;

        case 'Soft Drink / Soda':
            return 'https://www.thecocktaildb.com/images/media/drink/jylbrq1582580066.jpg'
            break;

        case 'Other/Unknown':
            return 'https://www.thecocktaildb.com/images/media/drink/5jdp5r1487603680.jpg'
            break;
        
        default:
            return 'https://www.thecocktaildb.com/images/media/drink/jylbrq1582580066.jpg'
            break;
    } 
}

// Create a home page route
app.get('/', function(req, res) {
    let drinkCategories = baseUrl + 'list.php?c=list'
    // Use request to call the API
    axios.get(drinkCategories)
    // console.log(axios.get(drinkCategories))
    
    .then( function(apiResponse) {
       // console.log(apiResponse.data)
       let drink = apiResponse.data.drinks;
       let image = []
        drink.forEach(d => {
            image.push(backgroundImage(d.strCategory))
        })
        console.log(drink)
        let ingUrl = baseUrl + 'list.php?i=list'
        axios.get(ingUrl)
        .then((apiTwo) => {
            console.log(apiTwo.data.drinks)
            let ingredient = apiTwo.data.drinks
            //console.log(backgroundImage(drink.strCategory))
            res.render('home', { drink, ingredient, image });
        })
       })
  });

// Create a wildcard (catch-all) route. Put it at the BOTTOM of routes
app.get('*', (req, res) => {
    res.render('error')
})

/*****************************
 * LISTEN
 *****************************/

// Pick a port to listen on
app.listen(process.env.PORT || 3000)