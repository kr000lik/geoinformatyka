angular.module('myApp',["firebase"])

.constant('FIREBASE_URI','https://luminous-torch-9705.firebaseio.com/')


.controller('myCtrl', function($scope, ItemsService){
  $scope.items = ItemsService.getItems();
  $scope.addItems = function(text){
      ItemsService.addItems({text: text});
      
      $scope.delete = function ( idx ) {
  var person_to_delete = $scope.persons[idx];

  API.DeletePerson({ id: person_to_delete.id }, function (success) {
    $scope.persons.splice(idx, 1);
  });
};
      
  }
})
     
    .factory('ItemsService', function($firebase, FIREBASE_URI){
     var ref = new Firebase(FIREBASE_URI+"/items");
     
     
  var sync = $firebase(ref);
  // download the data into a local object
  var items = sync.$asArray();
  
  var getItems = function(){
      return items;
  };
  
  var addItems = function(item){
        items.$add(item);
      
  };
  
  return{
      getItems :getItems,
      addItems :addItems
  }
  
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
 
     
 });