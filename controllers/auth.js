// Create an express router for Node Modules/Variables
let router = require('express').Router()
let db = require('../models')
let passport = require('../config/passportConfig')

// Routes
router.get('/login', (req, res) => 
res.render('auth/login'))

// POST /auth/login place for the login form to post to
router.post('/login', passport.authenticate('local', {
    successFlash: 'Successful login, welcome back!',
    successRedirect: '/profile/user',
    failureFlash: 'Invalid Credentials',
    failureRedirect: '/auth/login'
}))


// GET /auths / signup info
router.get('/signup', (req, res) => {
    res.render('auth/signup', { data: {} })
})

router.post('/signup', (req, res, next) => {

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
                passport.authenticate('local', {
                    successFlash: 'Successful login, welcome.',
                    successRedirect: '/profile/user',
                    failureFlash: 'Invalid Credentials',
                    failureRedirect: '/auth/login'
                })(req, res, next)
            }
            else {
                // Bad - this person already has an account
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
                // Send user back to the signup form to try again
                res.render('auth/signup', { data: req.body, alerts: req.flash() })
            }
            else {
                // Generic message for any other issue
                req.flash('error', 'Server error')
                // Redirect back to sign up
                res.redirect('/auth/signup')
            }
        })
    }
})

router.get('/logout', (req, res) => {
    //Remove user data from the session
    req.logout()
    req.flash('success', 'Bye bye! 😘')
    res.redirect('/auth/login')
})

// Export
module.exports = router