angular
  .module('opendecision.login')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$rootScope', '$scope', '$state', 'AuthenticationService', 'User'];

function LoginController($rootScope, $scope, $state, AuthenticationService, User) {

  $scope.invalid = false;

  $scope.login = function (credentials) {
    AuthenticationService.login(credentials).then(function (user) {
      AuthenticationService.setAuthenticationHeader();
      $rootScope.user = AuthenticationService.getUser();
      $state.go('workspaces');
    }, function() {
      $scope.invalid = true;
    });
  };
}
