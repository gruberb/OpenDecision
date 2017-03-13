// @ngInject
angular
  .module('opendecision')
  .controller('OpenDecisionController', OpenDecisionController);

OpenDecisionController.$inject = ['$rootScope', '$scope', '$state', 'AuthenticationService', 'Workspaces'];

function OpenDecisionController($rootScope, $scope, $state, AuthenticationService, Workspaces) {

  AuthenticationService.setAuthenticationHeader();
  $rootScope.user = AuthenticationService.getUser();

  $scope.logout = function() {
    AuthenticationService.logout();
    $state.go('login');
  };
}
