'use strict';

angular.module('linkninjaApp')
  .directive('newLink', function () {
    return {
      templateUrl: 'app/directives/newLink/newLink.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });