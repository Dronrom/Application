const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User') 
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})

    if (candidate){
        //check password, user exist
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult){
            //generation token, two passwords is the same
            
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt , {expiresIn: 3600})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else{
            //not the same passwords
            res.status(401).json({
                message: 'Passwords is not the same. Try again.'
            })
        }
    } else {
        //error, no user
        res.status(404).json({
            message: 'User with this email not found'
        })
    }
}

module.exports.register = async function(req, res){
  //email and password
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
      //User exist, need to send error
      res.status(409).json({
          message: 'This e-mail already exist. Try another one.'
      })
  } else {
      //Need to creat user
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password 

      const user = new User({
          email: req.body.email,
          password: bcrypt.hashSync(password, salt)
      })

      try{
        await user.save()
        res.status(201).json(user)
      } catch(e) {
        //error
        errorHandler(res, e)
      }
      
  }
}