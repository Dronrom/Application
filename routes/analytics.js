const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/analytics')
 
router.get('/overview', passport.authenticate('jwt', {session: false}), controller.overview)
router.get('/analytics', passport.authenticate('jwt', {session: false}), controller.analytic)

module.exports = router