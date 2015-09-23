// @ngInject
angular
  .module('opendecision', [
    'ui.router',
    'templates-app',
    'templates-common',
    'authentication',
    'api',
    'workspaces',
    'workspace',
    'decision',
    'user',
    'opendecision.login',
    'opendecision.registration',
    'opendecision.workspaces',
    'opendecision.createWorkspace',
    'opendecision.createDecision'
  ])
  .run(run);

run.$inject = ['$rootScope', '$state', 'AuthenticationService'];


function run($rootScope, $state, AuthenticationService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var isAuthenticationRequired = toState.data && toState.data.requiresLogin && !AuthenticationService.isAuthenticated();

    $rootScope.isAuthenticated = AuthenticationService.isAuthenticated();

    if(isAuthenticationRequired) {
      event.preventDefault();
      $state.go('login');
    }

    if((toState.name === 'login' && AuthenticationService.isAuthenticated()) ||
      (toState.name === 'registration' && AuthenticationService.isAuthenticated())) {
      $state.go('workspaces');
    }
  });
}