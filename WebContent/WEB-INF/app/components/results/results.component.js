'use strict';

REIApp.component('results', {
  bindings: {
    property: '=',
  },
  require: {
	 parentCtrl: '^^analysisTabForm'
  },
  controller: 'ResultsController',
  controllerAs: 'ctrl',
  bindToController: true,
  templateUrl: 'app/components/results/results.template.html'
});