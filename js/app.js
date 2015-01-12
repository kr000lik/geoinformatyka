angular.module('myApp',[])

.controller('myCtrl', function($scope, $http){
    var url = 'https://gdata.youtube.com/feeds/api/users/orbitalofficial/uploads?alt=json-in-script&callback=JSON_CALLBACK';
    $http.jsonp(url).success(function(data){
  
        $scope.results=data.feed.entry;
    
    });
});