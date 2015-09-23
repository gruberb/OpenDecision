angular
  .module('opendecision.registration',
    [
      'ui.router',
      'authentication'
    ]
  )
  .config(RegistrationConfig);

RegistrationConfig.$inject = ['$stateProvider'];

function RegistrationConfig($stateProvider) {
  $stateProvider.state( 'registration', {
    url: '/registration',
    views: {
      "main": {
        controller: 'RegistrationController',
        templateUrl: 'registration/registration.tpl.html'
      }
    }
  });
}
