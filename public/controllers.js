/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    // INITIALIZATION AND NAVBAR LOGIC
  }])

  //POSTS
  .controller('WinesIndexCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
    // GET POSTS
    // make a GET request for all posts with $http
    $http.get('http://daretodiscover.herokuapp.com/wines')
      .success( function (data) {
        $scope.wines = data;
        console.log($scope.wines);
      })
      .error ( function (data) {
        console.log("error");
      });
    // NEW POST
    // create an empty 'post' object within the scope


    // CREATE A POST    
    $scope.createWine = function() {
      // make a POST request to create the post with $http
      // sned the scope's post object as data
      var wine = { 
        name: $scope.wine.name,
        year: $scope.wine.year,
        description: $scope.wine.description, 
        picture: $scope.wine.picture
        };

      $http.post('http://daretodiscover.herokuapp.com/wines', wine)
        .success( function(wine) {
          $scope.wines.push(wine);
          console.log("add wine successful");
          $scope.wine = {};
        })
        .error(function(wine) {
          console.log("error");
        });


    };


      // reset scope's post object
      // $scope.editWine = function(wine, $index) {
      // // make a DELETE request for this post
      // $http.put('http://daretodiscover.herokuapp.com/wines/' + wine.id, wine)
      //   .success(function(response) {
      //     wine.editForm = false;
      //   })
      //   .error(function(response) {
      //     console.log("error");
      //   });
      // }; 


    $scope.editWine = function(wine) { 
      // make a DELETE request for this post
      $http.put('http://daretodiscover.herokuapp.com/wines/' + wine.id, wine)
        .success(function(response) {
          
          wine.editForm = false;
        })
        .error(function(response) {
          console.log("error");
        });
    };
  


    // DELETE A POST
    $scope.deleteWine = function(wine, $index) {
      // make a DELETE request for this post
      $http.delete('http://daretodiscover.herokuapp.com/wines/' + wine.id)
        .success(function(response) {
          console.log(response);
          $scope.wine = wine;
          $scope.wines.splice($index,1);
        })
        .error(function(response) {
          console.log("error");
        });
    };


  }]);
