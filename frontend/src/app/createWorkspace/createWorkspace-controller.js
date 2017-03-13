angular
  .module('opendecision.createWorkspace')
  .controller('CreateWorkspaceController', CreateWorkspaceController);

CreateWorkspaceController.$inject = ['$scope', '$state', 'Api', 'AuthenticationSession'];

function CreateWorkspaceController($scope, $state, Api, AuthenticationSession) {

  $scope.createWorkspace = function(workspace) {
    if(!workspace.admin) {
      workspace.admin = [];
    }

    workspace.admin.push(AuthenticationSession.userId);

    Api.createWorkspace(workspace).then(function(res) {
      return res;
    }).then(function(res) {
      $state.go('workspaces');
    });
  };
}
