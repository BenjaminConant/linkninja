'use strict';

angular.module('linkninjaApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $state) {
    $scope.user = {};
    $scope.errors = {};
    console.log(Auth.getCurrentUser());
    console.log(Auth.getCurrentUser()._id);

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
