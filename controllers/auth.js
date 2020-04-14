// Create an express router for Node Modules/Variables
let router = require('express').Router()

// Routes
router.get('/login', (req, res) => 
res.render('auth/login'))

// POST /auth/login place for the login form to post to
router.post('/login', (req, res) => {
    console.log('DATA', req.body)
    res.send('Hello from post route!')
})

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

// Export
module.exports = router