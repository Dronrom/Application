const express = require('express')
const passport = require('passport')
const router = express.Router()
const path = require('path')
const controller = require('../controllers/position')
 
router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId)
router.post('/', passport.authenticate('jwt', {session: false}),  controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}),  controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}),  controller.remove)

module.exports = router