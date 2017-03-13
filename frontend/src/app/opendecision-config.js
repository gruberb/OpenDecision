// @ngInject
angular
  .module('opendecision')
  .config(OpenDecisionConfig);

OpenDecisionConfig.$inject = ['$urlRouterProvider', '$httpProvider', 'localStorageServiceProvider'];

function OpenDecisionConfig($urlRouterProvider, $httpProvider, localStorageServiceProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    var key, result = [];
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
      }
    }
    return result.join("&");
  });

  $urlRouterProvider.otherwise( '/workspaces' );
}