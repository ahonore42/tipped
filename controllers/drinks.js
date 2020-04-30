let router = require('express').Router()
let db = require('../models')
const axios = require('axios');
let userLogin = require('../middleware/userLogin')
require('dotenv').config()
let filterUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?'
let searchUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?'
let infoUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?'
let ingUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?'
router.use(userLogin)

router.get('/list', (req, res) => {
    let url = ''
    let queryWord = ''

    if (req.query.i) {
        queryWord = req.query.i
    }
    else if (req.query.c) {
        queryWord = req.query.c
    }
    else if (req.query.a) {
        queryWord = req.query.a
    }
    else {
        queryWord = req.query.s
    }

    if (req.query.i) {
        url = filterUrl + 'i=' + req.query.i
    }
    else if (req.query.c) {
        url = filterUrl + 'c=' + req.query.c
    }
    else if (req.query.a) {
        url = filterUrl + 'a=' + req.query.a
    }
    else {
        url = searchUrl + 's=' + req.query.s
        
    }
    //console.log('This is the url', url)
    axios.get(url)
    .then ((apiResponse) => {
        let drink = apiResponse.data.drinks
        //console.log(apiResponse.data.drinks)
        res.render('drinks/list', { drink, queryWord })
    })
})

router.get('/info', (req, res) =>{
    let id = req.query.i
    console.log('DRINK ID', id)
    let url = infoUrl + 'i=' + id
    axios.get(url)
    .then((apiResponse) => {
        drink = apiResponse.data.drinks[0]
        console.log(drink)
        res.render('drinks/info', { drink })
    })
})

router.get('/ingredients', (req, res) =>{
        let id = req.query.i
        console.log('ing list', id)
        let url = ingUrl + 'i=' + id
        axios.get(url)
        .then((apiResponse) => {
            let ingredient = apiResponse.data.drinks
            res.render('drinks/ingredients', { ingredient })
        })
})

// router.get('/ingredients', (req, res) =>{
//     let id = req.query.i
//     console.log('ing list', id)
//     let url = infoUrl + '=' + id
//     axios.get(url)
//     .then((apiResponse) => {
//         let ingredient = apiResponse.data.drinks
//         res.render('drinks/ingredients', { ingredient })
//     })
// })

router.get('/ingredientInfo', (req, res) =>{
    let id = req.query.i
    // console.log('This is the query', id)
    let url = searchUrl + 'i=' + id
    axios.get(url)
    .then((apiResponse) => {
        let ingredient = apiResponse.data.ingredients
        console.log(ingredient)
        let drinksUrl = filterUrl + 'i=' + ingredient[0].strIngredient
        axios.get(drinksUrl)
        .then((apiTwo) => {
            let drink = apiTwo.data.drinks
            console.log('These are the drinks', drink)
            res.render('drinks/ingredientInfo', { ingredient, drink })
        })
    })
})

router.post('/fave', (req, res) => {
    db.user.findOne({
        where: { id: req.body.userId }
    })
    .then((user) => {
        console.log('hitting fave create')
        db.fave.findOrCreate({
            where: {
                name: req.body.drinkName,
                drinkId: req.body.drinkId
            }
          })
          .then(([fave, wasCreated ]) => {
              console.log(fave)
              user.addFave(fave)
            //   db.usersFaves.create({
            //       userId: req.body.userId,
            //       faveId: fave.fave.dataValues.id
            //   })
          })
          .then(() => {
              console.log('Attempting redirect')
              res.redirect('/profile/user')
          })
          .catch(err => {
              console.log(err)
              res.render('error')
          })
          
        })
        .catch(err => {
            console.log(err)
            res.render('error')
        })
  })

  router.delete('/fave/:id', (req, res) => {
    // Delete from the join table
    db.usersFaves.destroy({
      where: {
           faveId: req.params.id,
            userId: req.user.id
    }

    })
    .then(() => {
        res.redirect('/profile/user')
      })
      .catch(err => {
        console.log('Ooof', err)
        res.render('error')
      })
  })


module.exports = router