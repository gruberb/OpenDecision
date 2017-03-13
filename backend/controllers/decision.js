var Workspace = require('../models/workspace');
var Decision = require('../models/decision');

var setDecision = function(decision, newDecision) {
  decision.title = newDecision.title;
  decision.creationDate = newDecision.date ? newDecision.date : new Date();
  decision.updateDate = new Date();
  decision.related = newDecision.related;
  decision.tags = newDecision.tags ? newDecision.tags.split(",") : '';
  decision.cost = newDecision.cost;
  decision.time = newDecision.time;
  decision.description = newDecision.description;
  decision.success = newDecision.success;
  decision.reason = newDecision.reason;
  console.log('set decision', decision);
  return decision;
}

exports.postDecisions = function(req, res) {
  Workspace.findById({ admin: req.decoded._id, _id: req.params.workspace_id }, function(err, workspace) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    var decision = new Decision();

    decision = setDecision(decision, req.body);
    workspace.decisions.push(decision);

    workspace.save(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: 'Something went wrong.'
        });
      }

      res.json({ success: true,  message: 'decision added to the locker!', data: workspace });
    });
  });
};

exports.putDecision = function(req, res) {
  Workspace.findById({ admin: req.decoded._id, _id: req.params.workspace_id }, function(err, workspace) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    var decision = workspace.decisions.id(req.params.decision_id);

    decision = setDecision(decision, req.body);

    workspace.save(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: 'Something went wrong.'
        });
      }

      res.json({ success: true,  message: 'Decision saved.', data: workspace });
    });
  });
};

exports.deleteDecision = function(req, res) {
  // Use the workspace model to find a specific workspace and remove it
  Workspace.findById({ admin: req.decoded._id, _id: req.params.workspace_id }, function(err, workspace) {
    if (err) {
      return res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    workspace.decisions.pull(req.params.decision_id);

    workspace.save(function(err) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: 'Something went wrong.'
        });
      }

      res.json({ success: true, message: 'Decision removed.', data: workspace });
    });
  });
};