angular
  .module('opendecision.createWorkspace',
    [
      'ui.router'
    ]
  )
  .config(CreateWorkspaceConfig);

CreateWorkspaceConfig.$inject = ['$stateProvider'];

function CreateWorkspaceConfig($stateProvider) {
  $stateProvider.state( 'createWorkspace', {
    url: '/createworkspace',
    views: {
      "main": {
        controller: 'CreateWorkspaceController',
        templateUrl: 'createWorkspace/createWorkspace.tpl.html'
      }
    },
    data : {requiresLogin : true }
  });
}
