// Load required packages
var User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.authenticateUser = function(req, res) {
  var token;
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.' });
    }
    if (!user) {
      res.status(400).send({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {
      if (user.verifyPassword(req.body.password)) {
        res.json({
          success: true,
          token: jwt.sign(user, 'open.decision.secret'),
          data: user
        });
      } else {
        res.status(400).send({
          success: false,
          message: 'password does not match'});
      }
    };
  });
};

exports.isAuthenticated = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.oauth, function(err, decoded) {
      if (err) {
        return res.status(400).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
}
