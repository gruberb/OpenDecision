angular
  .module( 'workspaces', [])
  .factory('Workspaces', Workspaces);

Workspaces.$inject = ['Api', 'Workspace'];

function Workspaces(Api, Workspace) {
  var list = [];

  var initList = function(workspaceArray) {
    console.log('workspaceArray', workspaceArray);
    list = [];
    workspaceArray.forEach(function(workspace) {
      list.push(new Workspace(workspace));
    });
  };

  var miniList = function() {
    var _tmp = [];
    list.forEach(function(workspace) {
      _tmp.push({ id: workspace.id, title: workspace.title });
    });

    return _tmp;
  };

  var loadWorkspaces = function() {
    return Api.getWorkspaces().then(function(res) {
      return initList(res.data.data);
    }).then(function(initList) {
      return list;
    });
  };

  var saveDecision = function(workspaceId, decision) {
    Api.createDecision(workspaceId, decision).then(function(res) {
      return true;
    });
  };

  return {
    list: list,
    miniList: miniList,
    load: loadWorkspaces,
    saveDecision: saveDecision
  };
}