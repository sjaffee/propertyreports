'use strict';

REIApp.component('analysisTabForm', {
  bindings: {
    property: '='
  },
  require: {
	parentCtrl: '^^propertyGrid'
  },
  controller: 'AnalysisTabFormController',
  controllerAs: 'ctrl',
  bindToController: true,
  templateUrl: 'app/components/analysis-tab-form/analysis-tab-form.template.html'
});