angular
  .module('opendecision.workspaces')
  .controller('WorkspacesController', WorkspacesController);

WorkspacesController.$inject = ['$scope', '$state', 'Workspaces'];

function WorkspacesController($scope, $state, Workspaces) {

  Workspaces.load().then(function(workspaces) {
    $scope.workspaces = workspaces;
  });

  $scope.selectedWorkspace = {};

  $scope.showDetails = function(workspace) {
    $scope.selectedWorkspace = workspace;
  };

  $scope.isSelectedWorkspace = function(title) {
    return (title === $scope.selectedWorkspace.title);
  };
}