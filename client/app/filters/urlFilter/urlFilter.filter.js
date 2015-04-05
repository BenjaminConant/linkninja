'use strict';

angular.module('linkninjaApp')
  .filter('urlFilter', function ($document) {
    return function (input) {
    	var parser = document.createElement('a');
		parser.href = input;
      	return parser.hostname;
    };
  });
