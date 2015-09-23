describe('AuthenticationSession', function() {
  var AuthenticationSession;

  beforeEach( module( 'authentication' ) );

  beforeEach(inject(function($injector) {
    AuthenticationSession = $injector.get('AuthenticationSession');
    localStorageService = $injector.get('localStorageService');
  }));
});
