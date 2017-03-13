// Load required packages
var User = require('../models/user');
var jwt = require('jsonwebtoken');

// Create endpoint /api/users for POST
exports.createUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    registrationDate: new Date()
  });

  user.save(function(err) {
    if (err)res.status(500).send({
        success: false,
        error: 'Could not save user.'
      });

    res.json({ message: 'New user added.' });
  });
};

exports.getUsers = function(req, res) {
  User.find({}, function(err, users) {
    res.json({ success: true, data: users });
  });
};

var createToken = function(user) {
  return jwt.sign(user, process.env.oauth);
}
