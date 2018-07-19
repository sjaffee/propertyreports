'use strict';

REIApp.component('rentalInfo', {
  bindings: {
    property: '=',
    hasErrors: '='
  },
  controller: 'RentalInfoController',
  controllerAs: 'ctrl',
  bindToController: true,
  templateUrl: 'app/components/rental-info/rental-info.template.html'
});