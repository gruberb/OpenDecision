angular
  .module( 'api', [])
  .service('Api', Api);

Api.$inject = ['$http'];

function Api($http) {

  var baseUrl = 'https://opendecision.herokuapp.com/api/';

  function getWorkspaces() {
    return $http({
      method: 'GET',
      url: baseUrl + 'workspaces'
    });
  }

  function createWorkspace(workspace) {
    return $http({
      method: 'POST',
      url: baseUrl + 'workspaces',
      data: workspace
    });
  }

  function createDecision(workspaceId, decision) {
    return $http({
      method: 'POST',
      url: baseUrl + 'workspaces/' + workspaceId + '/decisions',
      data: decision
    });
  }

  function login(user) {
    return $http({
      method: 'POST',
      url: baseUrl + 'authenticate',
      data: user
    });
  }

  function register(userData) {
    return $http({
      method: 'POST',
      url: baseUrl + 'users',
      data: userData
    });
  }

  return {
    login: login,
    register: register,
    getWorkspaces: getWorkspaces,
    createWorkspace: createWorkspace,
    createDecision: createDecision
  };
}
