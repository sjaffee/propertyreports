'use strict';

REIApp.component('purchaseInfo', {
  bindings: {
    property: '=',
    hasErrors: '='
  },
  controller: 'PurchaseInfoController',
  controllerAs: 'ctrl',
  bindToController: true,
  templateUrl: 'app/components/purchase-info/purchase-info.template.html'
});