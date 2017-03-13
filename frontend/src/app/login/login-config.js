angular
  .module('opendecision.login',
    [
      'ui.router',
      'authentication'
    ]
  )
  .config(LoginConfig);

LoginConfig.$inject = ['$stateProvider'];

function LoginConfig($stateProvider) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginController',
        templateUrl: 'login/login.tpl.html'
      }
    }
  });
}
