var Workspace = require('../models/workspace');

var setWorkspace = function(workspace, newWorkspace) {
  workspace.title = newWorkspace.body.title;
  workspace.creationDate = new Date();
  workspace.related = newWorkspace.body.related;
  workspace.tags = newWorkspace.body.tags ? newWorkspace.body.tags.split(",") : '';
  workspace.cost = newWorkspace.body.cost;
  workspace.time = newWorkspace.body.time;
  workspace.description = newWorkspace.body.description;
  workspace.success = newWorkspace.body.success;
  workspace.admin.push(newWorkspace.decoded._id);

  return workspace;
}
// Create endpoint /api/workspaces for POSTS
exports.postWorkspaces = function(req, res) {
  // Create a new instance of the workspace model
  var workspace = new Workspace();

  setWorkspace(workspace, req);

  // Save the workspace and check for errors
  workspace.save(function(err) {
    if (err) {
      res.status(500).send({
        success: false,
        error: 'Something went wrong.'
      });
    }

    res.json({ success: true, message: 'Workspace successfuly added to DB.' });
  });
};

// Create endpoint /api/workspaces for GET
exports.getWorkspaces = function(req, res) {
  // Use the workspace model to find all workspace
  Workspace.find({ admin: req.decoded._id }, function(err, workspaces) {
    if (err) {
      res.status(500).send({
        success: false,
        error: 'Could not fetch the workspaces.'
      });
    }

    res.json({ success: true, data: workspaces });
  });
};

// Create endpoint /api/workspaces/:workspace_id for GET
exports.getWorkspace = function(req, res) {
  // Use the workspace model to find a specific workspace
  Workspace.findById({ admin: req.decoded._id, _id: req.params.workspace_id }, function(err, workspace) {
    if (err) {
      res.status(500).send({
        success: false,
        error: 'Something went wrong during getting your workspace.'
      });
    }

    res.json({ success: true, data: workspace });
  });
};

// Create endpoint /api/workspaces/:workspace_id for PUT
exports.putWorkspace = function(req, res) {
  // Use the workspace model to find a specific workspace
  Workspace.findById({ admin: req.decoded._id, _id: req.params.workspace_id }, function(err, workspace) {
    if (err) {
      res.status(500).send({
        success: false,
        error: 'Something went wrong during selecting the workspace.'
      });
    }

    // Update the existing workspace quantity
    setWorkspace(workspace, req.body);

    // Save the workspace and check for errors
    workspace.save(function(err) {
      if (err) {
        res.status(500).send({
          success: false,
          error: 'Something went wrong during saving workspace.'
        });
      }

      res.json({ success: true, message: 'Workspace was successfuly saved.' });
    });
  });
};

// Create endpoint /api/workspaces/:workspace_id for DELETE
exports.deleteWorkspace = function(req, res) {
  // Use the workspace model to find a specific workspace and remove it
  Workspace.findByIdAndRemove({ admin: req.decoded._id, _id: req.params.workspace_id }, function(err) {
    if (err) {
        res.status(500).send({
          success: false,
          error: 'Something went wrong during saving workspace.'
      });
    }

    res.json({ success: true,  message: 'Workspace was successfuly deleted.' });
  });
};
