angular
  .module( 'user', [])
  .service('User', User);

  User.$inject = [];

function User() {
  return function(user) {
    this.id = user._id;
    this.name = user.name;
  };
}