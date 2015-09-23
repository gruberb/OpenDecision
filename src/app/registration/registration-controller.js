angular
  .module('opendecision.registration')
  .controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['$scope', '$rootScope', '$state', 'AuthenticationService', 'AUTH_EVENTS'];

function RegistrationController($scope, $rootScope, $state, AuthenticationService, AUTH_EVENTS) {

  $scope.register = function (credentials) {
    if(credentials.password != credentials.reenterpassword) {
      return false;
    }

    AuthenticationService.register(credentials).then(function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $state.go('login');
    }, function() {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
}
