/**
 * Created by MisterNT on 4/30/2017.
 */
import Validator from 'validatorjs';
import { User } from './../models/user.model'
import JWT from 'jsonwebtoken'
import ignoreCase from 'ignore-case';
const envd = process.env.NODE_ENV || 'development';
const configd = require('./../config/config.json')[envd];
const config = require('./../config/config.json')[configd.env];
const Users = function (req, res) {

    if (req.headers.authorization && ignoreCase.equals(req.headers.authorization.split(' ')[0], 'bearer')) {

        // verifies secret and checks exp
        JWT.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, function (err, decoded) {
            if (err) {
                res.status(400).json({ success: false, message: 'Failed_to_authenticate_token' });
            } else {


                switch (req.params.action) {
                    case "forgetpass":
                        break;
                    case "update":

                        if (req.body.firstname) {
                            User.update(
                                { firstname: req.body.firstname } /* set attributes' value */,
                                { where: { username: decoded.username } } /* where criteria */).then(function (affectedRows) { })
                        }
                        if (req.body.lastname) {
                            User.update(
                                { lastname: req.body.lastname } /* set attributes' value */,
                                { where: { username: decoded.username } } /* where criteria */).then(function (affectedRows) { })
                        }
                        if (req.body.gender) {
                            User.update(
                                { gender: req.body.gender } /* set attributes' value */,
                                { where: { username: decoded.username } } /* where criteria */).then(function (affectedRows) { })
                        }
                        if (req.body.image) {
                            User.update(
                                { image: req.body.image } /* set attributes' value */,
                                { where: { username: decoded.username } } /* where criteria */).then(function (affectedRows) { })
                        }
                        if (req.body.birthday) {
                            let rules = {
                                birthday: 'required|date'
                            };

                            let validation = new Validator(req.body, rules);
                            validation.passes(function () {
                                User.update(
                                    { birthday: req.body.birthday } /* set attributes' value */,
                                    { where: { username: decoded.username } } /* where criteria */).then(function (affectedRows) { })
                            })
                            validation.fails(function () {
                                res.status(400).send(validation.errors);
                            });
                        }
                        User.findOne({ where: { username: decoded.username } }).then(function (User) {
                            let arrays = User;
                            delete arrays.dataValues.password;
                            delete arrays.password;
                            res.status(200).send({
                                success: true
                             //   data: arrays
                            });
                        })

                        break;
                    case "mail_confirm":
                        break;
                    default:
                        res.status(400).json({ success: false, message: '404_NOT_FOUND' });
                        break;
                }
            }
        });


    } else {
        res.status(400).json({ success: false, message: 'Failed_to_authenticate_token_send_header' });
    }
}
export default Users