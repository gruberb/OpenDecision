angular
  .module( 'decision', [])
  .service('Decision', Decision);

  Decision.$inject = [];

function Decision() {

  var getDateString = function(decision) {
    console.log('datestring', decision);
    if(!decision.creationDate) {
      return;
    }
    return decision.creationDate.substr(0,4) + '/' + decision.creationDate.substr(5,2) + '/' + decision.creationDate.substr(8,2);
  };

  return function(decision) {
    this.id = decision._id;
    this.title = decision.title;
    this.creationDate = getDateString(decision);
    this.related = decision.related;
    this.cost = decision.cost ? decision.cost : 0;
    this.tags = decision.tags;
    this.description = decision.description;
    this.time = decision.time ? decision.time : 0;
    this.success = decision.success ? decision.success : 'not yet defined';
  };
}