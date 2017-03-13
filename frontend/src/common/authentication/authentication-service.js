angular
  .module( 'authentication', ['LocalStorageModule'])
  .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['AuthenticationSession', 'Api', '$http'];

function AuthenticationService(AuthenticationSession, Api, $http) {
  var authService = {};

  authService.login = function(credentials) {
    return Api.login(credentials).then(function(cb) {
        AuthenticationSession.create(cb);
        return true;
      });
  };

  authService.register = function(formData) {
    return Api.register(formData).then(function(cb) {
      return true;
    });
  };

  authService.getUser = function() {
    return AuthenticationSession.userName;
  };

  authService.logout = function() {
    return AuthenticationSession.destroy();
  };

  authService.isAuthenticated = function() {
    return !!AuthenticationSession.userId;
  };

  authService.setAuthenticationHeader = function() {
    $http.defaults.headers.common['x-access-token'] = AuthenticationSession.token;
  };

  return authService;
}
