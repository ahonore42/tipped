// Create an express router for Node Modules/Variables
let router = require('express').Router()

// Routes
router.get('/login', (req, res) => 
res.render('auth/login'))

router.get('/signup', (req, res) => {
    res.send('STUB - sign up form')
})

// Export
module.exports = router