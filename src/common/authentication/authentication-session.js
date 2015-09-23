angular
  .module( 'authentication')
  .service('AuthenticationSession', AuthenticationSession);

AuthenticationSession.$inject = ['localStorageService'];

function AuthenticationSession(localStorageService) {
  this.userId = localStorageService.get('userId') || null;
  this.token = localStorageService.get('token') || null;
  this.userName = localStorageService.get('userName') || null;

  this.create = function(data) {
    this.userId = data.data.data._id;
    this.token = data.data.token;
    this.userName = data.data.data.username;

    localStorageService.set('userId', data.data.data._id);
    localStorageService.set('token', data.data.token);
    localStorageService.set('userName', data.data.data.username);
  };

  this.destroy = function() {
    this.userId = null;
    this.token = null;
    this.userRole = null;

    localStorageService.remove('userId');
    localStorageService.remove('token');
    localStorageService.remove('userName');
  };
}
