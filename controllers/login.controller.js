/**
 * Created by MisterNT on 5/1/2017.
 */
import Validator from 'validatorjs';
import {User} from './../models/user.model'
import JWT from 'jsonwebtoken'

const envd  = process.env.NODE_ENV || 'development';
const configd    = require('./../config/config.json')[envd];
const config    = require('./../config/config.json')[configd.env];
const Login = function (req, res) {

                  const rules = {
                    username: 'required',
                    password: 'required'                
                 }

                let validation = new Validator(req.body, rules);
                validation.passes(function () {
                
                 User.findOne({ where: {username: req.body.username , password : req.body.password} }).then(function(User) {
                 let arrays = User;
                 if(arrays != null){

                let tokens = JWT.sign({  username: req.body.username,
                 firstname: req.body.firstname,
                 lastname: req.body.lastname,
                 image: req.body.image,
                 gender: req.body.gender,
                 birthday: req.body.birthday
                  },config.jwt_secret , { expiresIn: '1h' })

               res.status(200).send({
               success: true,
               data: arrays,
               token: tokens
               });               
              }else{
                res.status(401).json({ success: false, message: 'Failed_to_authenticate_Login' })
              }
       
              })
                 
                 });
                  validation.fails(function () {
                  res.status(400).send(validation.errors)
                })

}
export default Login