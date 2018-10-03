/**
 * Created by MisterNT on 4/30/2017.
 */
import Validator from 'validatorjs';
import {User} from './../models/user.model'
import JWT from 'jsonwebtoken'
const env  = process.env.NODE_ENV || 'development';
const configd    = require('./../config/config.json')[env];
const config    = require('./../config/config.json')[configd.env];
const Register = function (req, res) {
    User
        .findAndCountAll({
            where: {
                username: req.body.username
            }
        })
        .then(function (result) {
            if (result.count === 0) {

                const rules = {
                    username: 'required',
                    password: 'required',
                    firstname: 'required',
                    lastname: 'required',
                    image: 'required',
                    gender: 'required',
                    birthday: 'required|date'

                };

                let validation = new Validator(req.body, rules);
                validation.passes(function () {
                    User.create({
                        username: req.body.username,
                        password: req.body.password,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        image: req.body.image,
                        gender: req.body.gender,
                        birthday: req.body.birthday
                    }).then(function (succcess) {

                      let tokens = JWT.sign({  username: req.body.username,
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                image: req.body.image,
                                gender: req.body.gender,
                                birthday: req.body.birthday
                     },config.jwt_secret , { expiresIn: '1h' })

                        res.status(200).send({
                            success: true,
                            data: succcess,
                            token: tokens
                        });

                    })
                });

                validation.fails(function () {
                    res.status(400).send(validation.errors);
                });

            } else {
                return res.status(400).send({
                    success: false,
                    message: "USER_IS_ALREADY"
                });
            }

        });


}

export default Register