import Connection from '../models/model'
const post = function (req, res, next) {
    Connection
        .authenticate()
        .then(function (err) {
            console.log('Model has been established successfully.');
            res.json("Model");
        })
        .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });




};

export default post

