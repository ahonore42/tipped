let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')
let db = require('../models')
const axios = require('axios')

// Custom middleware that is ONLY applied to the routes in this file!
router.use(userLogin)

// GET /profile/user - a normal profile for the plebs
// NOTE: Protect this route from users who are not logged in
router.get('/user', (req, res) => {
    db.user.findOne({
        where: { id: req.user.id },
        include: [db.fave]
    })
    .then((user) => {
        let url = 'https://thecocktaildb.com/api/json/v2/9973533/filter.php?a='
        let alc = url + 'Alcoholic'
        let nonalc = url + 'Non_Alcoholic'
        axios.get(alc)
        .then((apiResponse) => {
            let drink = apiResponse.data.drinks
            // console.log(drink)
            axios.get(nonalc)
            .then((apiTwo) => {
                let drank = apiTwo.data.drinks
                // console.log(drank)
                res.render('profile/user', { moment, user, drink, drank })
            })
        })
    })
})



// GET /profile/guest/userId - viewing a user's profile as a guest
router.get('/guest/:id', (req, res) => {
    db.user.findOne({
        where: { id: req.params.id },
        include: [db.fave]
    })
    .then((userProfile) => {
        let url = 'https://thecocktaildb.com/api/json/v2/9973533/filter.php?a='
        let alc = url + 'Alcoholic'
        let nonalc = url + 'Non_Alcoholic'
        axios.get(alc)
        .then((apiResponse) => {
            let drink = apiResponse.data.drinks
            // console.log(drink)
            axios.get(nonalc)
            .then((apiTwo) => {
                let drank = apiTwo.data.drinks
                // console.log(drank)
                res.render('profile/guest', { moment, userProfile, drink, drank })
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

// GET /profile/admin - a special profile for admins
// Note: Protect this route from users who are not logged in AND users who are NOT admins
router.get('/admin', adminLogin, (req, res) => {
    db.user.findAll()
    .then(users => {
        res.render('profile/admin', { moment, users })
        
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})



module.exports = router