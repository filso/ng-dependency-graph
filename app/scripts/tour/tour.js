'use strict';

angular.module('ngDependencyGraph')
  .factory('tour', function() {
    var tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-default shepherd-element shepherd-open',
        showCancelLink: true,
        scrollTo: false
      }
    });

    var stepButtons = [{
          text: 'Next',
          action: tour.next
    }];

    var steps = {

      welcome: {
        text: 'Welcome to AngularJS depedency graph browser.',
        buttons: stepButtons
      },

      chooseScope: {
        text: 'Switch between modules and components view...',
        attachTo: '.choose-scope bottom',
        buttons: stepButtons
      },


      ignoreModules: {
        text: 'Use ‘Ignore’ field to hide modules you don’t want to see..',
        attachTo: '.options__ignore left',
        buttons: stepButtons
      },


      filterModules: {
        text: '…or ‘Filter’ field to specify which modules you want to see.',
        attachTo: '.options__filter left',
        buttons: stepButtons
      },

      stickyNodes: {
        text: 'If you’d like your nodes to stay where you drag them - make nodes sticky.<br/>Double click to free node.',
        attachTo: '.options__sticky-nodes left',
        buttons: stepButtons
      },

      stickyNodes: {
        text: 'You can filter components view by type.',
        attachTo: '.trigger-components right',
        buttons: stepButtons
      },

      search: {
        text: 'To focus on particular component or module, use search field.',
        attachTo: '.search right',
        buttons: stepButtons
      },


    };

    _.each(steps, function(step) {
      tour.addStep(step);
    });

    return tour;

  });
