describe('AuthenticationService', function() {
  var $q;
  var AuthenticationService;
  var AuthenticationSession;
  var Api;

  beforeEach(module('authentication'));
  beforeEach(module('api'));

  // injecting dependencies
  beforeEach(inject(function($injector) {
    AuthenticationService = $injector.get('AuthenticationService');
    AuthenticationSession = $injector.get('AuthenticationSession');
    Api = $injector.get('Api');
    $q = $injector.get('$q');

    spyOn(Api, 'login').andCallFake(function() {
        var deferred = $q.defer();
        deferred.resolve('Remote call result');

        return deferred.promise;
§    });
  }));

  it('calls login and returns a promise', inject(function() {
    var response = {data: {data: {id: 1, email: 'test'}}};
    var credentials = {email: 'admin', password: 'admin'};

    spyOn(AuthenticationService, 'login').andCallThrough();
    spyOn(AuthenticationSession, 'create');

   AuthenticationService.login(credentials);

    Api.login(credentials).then(function(response) {
      expect(AuthenticationSession.create).toHaveBeenCalledWith();
    });
  }));

  it('should call to destroy the session when logout is called', function() {
    spyOn(AuthenticationSession, 'destroy');
    AuthenticationService.logout();

    expect(AuthenticationSession.destroy).toHaveBeenCalled();
  });

  it('authenticates user when ID is provided', function() {
    AuthenticationSession.userId = 2;
    spyOn(AuthenticationService, 'isAuthenticated').andCallThrough();

    var is = AuthenticationService.isAuthenticated();

    expect(is).toBe(true);
  });

  it('declines user when ID is not provided', function() {
    AuthenticationSession.userId = undefined;
    spyOn(AuthenticationService, 'isAuthenticated').andCallThrough();

    var is = AuthenticationService.isAuthenticated();

    expect(is).toBe(false);
  });
});
