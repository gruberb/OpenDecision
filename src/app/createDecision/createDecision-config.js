angular
  .module('opendecision.createDecision',
    [
      'ui.router'
    ]
  )
  .config(CreateDecisionConfig);

CreateDecisionConfig.$inject = ['$stateProvider'];

function CreateDecisionConfig($stateProvider) {
  $stateProvider.state( 'createDecision', {
    url: '/createdecision',
    views: {
      "main": {
        controller: 'CreateDecisionController',
        templateUrl: 'createDecision/createDecision.tpl.html'
      }
    },
    data : {requiresLogin : true }
  });
}
