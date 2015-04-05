'use strict';

describe('Filter: urlFilter', function () {

  // load the filter's module
  beforeEach(module('linkninjaApp'));

  // initialize a new instance of the filter before each test
  var urlFilter;
  beforeEach(inject(function ($filter) {
    urlFilter = $filter('urlFilter');
  }));

  it('should return the input prefixed with "urlFilter filter:"', function () {
    var text = 'angularjs';
    expect(urlFilter(text)).toBe('urlFilter filter: ' + text);
  });

});
