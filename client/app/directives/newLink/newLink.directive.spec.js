'use strict';

describe('Directive: newLink', function () {

  // load the directive's module and view
  beforeEach(module('linkninjaApp'));
  beforeEach(module('app/directives/newLink/newLink.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<new-link></new-link>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the newLink directive');
  }));
});