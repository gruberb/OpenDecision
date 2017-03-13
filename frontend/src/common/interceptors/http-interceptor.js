angular
  .module( 'interceptors', [])
  .factory('HttpInterceptors', HttpInterceptors);

HttpInterceptors.$inject = ['$q', '$injector'];

function HttpInterceptors($q, $injector) {
  return {
    // On request success
    request: function (config) {
      // console.log(config); // Contains the data about the request before it is sent.

      // Return the config or wrap it in a promise if blank.
      return config || $q.when(config);
    },

    // On request failure
    requestError: function (rejection) {
      //console.log('rejection', rejection); // Contains the data about the error on the request.

      // Return the promise rejection.
      return $q.reject(rejection);
    },

    // On response success
    response: function (response) {
      // console.log(response); // Contains the data from the response.

      // Return the response or promise.
      return response || $q.when(response);
    },

    // On response failture
    responseError: function (rejection) {
      if(rejection.status === 401 || rejection.status === 400) {
        var state = $injector.get('$state');
        state.go('login');
      }

      // Return the promise rejection.
      return $q.reject(rejection);
    }
  };
}
