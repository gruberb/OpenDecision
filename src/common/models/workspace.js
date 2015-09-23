angular
  .module( 'workspace', [])
  .service('Workspace', Workspace);

  Workspace.$inject = ['Decision'];

function Workspace(Decision) {

  var createDecisions = function(workspace) {
    var _decisions = [];
    workspace.decisions.forEach(function(decision) {
      _decisions.push(new Decision(decision));
    });
    return _decisions;
  };

  return function(workspace) {
    this.id = workspace._id;
    this.title = workspace.title;
    this.admin = workspace.admin;
    this.category = workspace.category;
    this.tags = workspace.tags;
    this.description = workspace.description;
    this.decisions = createDecisions(workspace);
  };
}
