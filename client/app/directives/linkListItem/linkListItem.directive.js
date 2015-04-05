'use strict';

angular.module('linkninjaApp')
  .directive('linkListItem', function (link) {
    return {
      templateUrl: 'app/directives/linkListItem/linkListItem.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.deleteLink = function(linkId) {
      		link.delete(linkId).then(function(res){
      			console.log(res);
      			var linkIndex;
      			scope.userLinks.forEach(function(link, index){
      				if (link._id === linkId) {
      					linkIndex = index;
      				}
      			})
      			scope.userLinks.splice(linkIndex, 1);
      		})
      	}
      }
    };
  });