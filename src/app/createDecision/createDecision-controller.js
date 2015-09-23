angular
  .module('opendecision.createDecision')
  .controller('CreateDecisionController', CreateDecisionController);

CreateDecisionController.$inject = ['$scope', '$state', 'Workspaces'];

function CreateDecisionController($scope, $state, Workspaces) {
  $scope.workspaces = Workspaces.miniList();

  $scope.createDecision = function(decision) {
    Workspaces.saveDecision(decision.workspaceId, decision);
    $state.go('workspaces');
  };
}
