'use strict';

angular.module('linkninjaApp')
  .controller('MainCtrl', function ($scope, $http, socket, $state, Auth, $location, User, link) {
    $scope.newLink = {};
    $scope.userLinks = {};
    User.get().$promise.then(function(user){    
      console.log(user);
      $scope.newLink._id = user._id;
      $scope.user = user;
      $scope.userLinks = $scope.user.links;
      socket.syncUpdates('user', $scope.user);
    });

    $scope.createLink = function() {
      console.log("this is the new link", $scope.newLink);
      link.create($scope.newLink).then(function(responce){
        console.log(responce.data.links);
        $scope.userLinks = responce.data.links
        $scope.newLink.url = "";
      });
    }

    socket.socket.on('link:save', function(data){
      $scope.userLinks.push(data);
    })







    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
