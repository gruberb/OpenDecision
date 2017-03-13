// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors')

var passport = require('passport');
var authController = require('./controllers/auth');

var workspaceController = require('./controllers/workspace');
var decisionController = require('./controllers/decision');
var userController = require('./controllers/user');

var app = express();

// Connect to the decisionlocker MongoDB
mongoose.connect(process.env.databaseUri);

var corsOptions = {
  origin: process.env.corsUrl,
  credentials: true
};

app.use(cors(corsOptions));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Use environment defined port or 3000
var router = express.Router();

router.route('/workspaces')
  .post(authController.isAuthenticated, workspaceController.postWorkspaces)
  .get(authController.isAuthenticated, workspaceController.getWorkspaces);

router.route('/workspaces/:workspace_id')
  .get(authController.isAuthenticated, workspaceController.getWorkspace)
  .put(authController.isAuthenticated, workspaceController.putWorkspace)
  .delete(authController.isAuthenticated, workspaceController.deleteWorkspace);

router.route('/workspaces/:workspace_id/decisions')
  .post(authController.isAuthenticated, decisionController.postDecisions);

router.route('/workspaces/:workspace_id/decisions/:decision_id')
  .put(authController.isAuthenticated, decisionController.putDecision)
  .delete(authController.isAuthenticated, decisionController.deleteDecision);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.createUsers)
  .get(userController.getUsers);

router.route('/authenticate')
  .post(authController.authenticateUser);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(process.env.PORT || 3000)
