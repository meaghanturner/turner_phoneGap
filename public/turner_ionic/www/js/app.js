// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ArrestApp = angular.module('ArrestApp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope,$location) {
   $rootScope.goHome = function(){
      $location.path('/list');
  //     send app to home page
    };
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

ArrestApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/list',{
    controller: 'ListController',
    templateUrl: 'partials/list.html'
  })
  .when('/details/:id',{
    controller: 'DetailsController',
        templateUrl: 'partials/details.html'
  })
  .otherwise({redirectTo: '/list'});
}]);

ArrestApp.controller('ListController', ['$scope', '$http', '$ionicLoading',function($scope, $http, $ionicLoading){
    $scope.loadInfo = function(){
       // $ionicLoading.show(); //start spinner
        $http.get("http://localhost:8888/turner_arrested/public/welcome") //get route to test paste into browser
        .success(function(response){
          console.log (response);
          $scope.character = response;
          $scope.image = response;
          })
            .finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
      
        });

}
$scope.loadInfo();
}]);

ArrestApp.controller('DetailsController',['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams){

$ionicLoading.show(); //show spinner, show user app is still working 
console.log($routeParams.id); //which list item user clicks

  $http.get("http://localhost:8888/turner_arrested/public/welcome")
  .success(function(response){
    $scope.character = response[$routeParams.id]; 
      $scope.image = response[$routeParams.id];
$ionicLoading.hide(); //hide/stop spinner
  });
}]);
