angular
  .module('opendecision.workspaces',
    [
      'ui.router'
    ]
  )
  .config(WorkspacesConfig);

WorkspacesConfig.$inject = ['$stateProvider'];

function WorkspacesConfig($stateProvider) {
  $stateProvider.state( 'workspaces', {
    url: '/workspaces',
    views: {
      "main": {
        controller: 'WorkspacesController',
        templateUrl: 'workspaces/workspaces.tpl.html'
      }
    },
    data : {requiresLogin : true }
  });
}
