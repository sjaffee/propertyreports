'use strict';

REIApp.component('propertyInfo', {
  bindings: {
    property: '=',
    hasErrors: '='
  },
  controller: 'PropertyInfoController',
  controllerAs: 'ctrl',
  bindToController: true,
  templateUrl: 'app/components/property-info/property-info.template.html'
});