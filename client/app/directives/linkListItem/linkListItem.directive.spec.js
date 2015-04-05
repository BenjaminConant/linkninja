'use strict';

describe('Directive: linkListItem', function () {

  // load the directive's module and view
  beforeEach(module('linkninjaApp'));
  beforeEach(module('app/directives/linkListItem/linkListItem.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<link-list-item></link-list-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the linkListItem directive');
  }));
});