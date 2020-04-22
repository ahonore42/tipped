// Create an express router for Node Modules/Variables
let router = require('express').Router()
let db = require('../models')

// Routes
router.get('/login', (req, res) => 
res.render('auth/login'))

// POST /auth/login place for the login form to post to
router.post('/login', (req, res) => {
    console.log('DATA', req.body)
    res.send('Hello from post route!')
})


// GET /auths / signup info
router.get('/signup', (req, res) => {
    res.render('auth/signup', { data: {} })
})

router.post('/signup', (req, res) => {

    console.log('REQUEST BODY', req.body)
    if (req.body.password !== req.body.password_verify) {
        // Send an error message about passwords not matching
        req.flash('error', 'Passwords do not match.')
        // Put the user back on signup form to try again
        res.render('auth/signup', { data: req.body, alerts: req.flash() })
    }
    else {
        // Passwords matched, so now we'll find/create by the user's email
        db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: req.body
        })
        .then(([user, wasCreated]) => {
            if (wasCreated) {
                // Good, this was expected, they are actually NEW
                // TODO: AUTO-LOGIN
                res.send('IT WORKED')
            }
            else {
                // Bad - this person already hass an account
                req.flash('error', 'Account already exists with this username')
                res.redirect('/auth/login')
            }
        })
        .catch(err => {
            // Print entire error to the terminal
            console.log('Error creating a user', err)

            // Check for Sequelize validation errors and make flash messages for them
            if (err.errors) {
                err.errors.forEach(e => {
                    console.log('ERROR', e)
                    if (e.type == 'Validation Error', e.message) {
                        req.flash('error', e.message)
                    }
                })
            }
            else {
                // Generic message for any other issue
                req.flash('error', 'Server error')
            }

            // Redirect back to sign up
            res.redirect('/auth/signup')
        })
    }
})

// Export
module.exports = router