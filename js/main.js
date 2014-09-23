var app = angular.module('app', ['firebase'])

app.factory("Ycapi", ["$firebase", function($firebase) {
  return function(path) {
    // create a reference to the user's profile
    var ref = new Firebase("https://ycapi.firebaseio.com/"+path);

    // return it as a synchronized object
    return $firebase(ref).$asObject();
  }
}])

.controller('ycapi', ['$location','Ycapi','$scope', '$firebase',
function($location,Ycapi,$scope, $firebase) {
  $scope.navShow = true;
  $scope.groups = Ycapi("groups");
  $scope.api = {};

  $scope.$on('$locationChangeSuccess', function(event) {
      $scope.navShow = false;
      var path = $location.path();
      if(path){ 
        path = encodeURI(path);
        $scope.api = Ycapi("groups"+path);
        // var ref = new Firebase("https://ycapi.firebaseio.com/groups/%E5%88%9D%E5%A7%8B%E5%8C%96/%E8%8E%B7%E5%8F%96%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0");
        // $scope.api = $firebase(ref).$asObject();
      }
  });
  // $scope.format = function(object){
  //   var newArray = [];
  //   format(object,newArray,0);
  //   return newArray;
  // }
  $scope.$watch("api.return",function(){
    var newArray = [];
    format($scope.api["return"],newArray,0);
    $scope.newApiReturn = newArray;
  });

}])
;

function format(object,newArray,leavl){
  for (var key in object) {
    var value = object[key];

    if(typeof value === "object"){
      newArray.push([key,value.thisIsNot,leavl]);
      format(value,newArray,leavl+1);
    }else if(key == "thisIsNot"){
    }else{
      newArray.push([key,value,leavl]);
    }
  };
}