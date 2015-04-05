'use strict';

angular.module('linkninjaApp')
  .factory('link', function ($http) {

    return {
      create: function (link) {
        return $http.post('/api/links',link);
      },
      delete: function (linkId) {
      	return $http.delete('/api/links/'+linkId);
      }
    };
  });
