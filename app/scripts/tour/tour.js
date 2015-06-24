'use strict';

angular.module('ngDependencyGraph')
  .factory('tour', function($rootScope, storage) {
    var tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-default shepherd-element shepherd-open',
        showCancelLink: true,
        scrollTo: false
      }
    });

    var onDone = function() {
      storage.saveTourDone();
      $rootScope.$apply();
    };

    tour.on('complete', onDone);
    tour.on('cancel', onDone);
    tour.on('hide', onDone);

    var buttons = {
      step: [{
        text: 'Next',
        action: tour.next
      }],
      finish: [{
        text: 'Finish',
        action: tour.next
      }]
    };


    var steps = {

      welcome: {
        text: 'Welcome to AngularJS dependency graph browser.',
        buttons: buttons.step
      },

      chooseScope: {
        text: 'Switch between modules and components view here.',
        attachTo: '.choose-scope bottom',
        buttons: buttons.step
      },

      ignoreModules: {
        text: 'Use \'Ignore\' field to hide modules you don\'t want to see...',
        attachTo: '.options__ignore left',
        buttons: buttons.step
      },


      filterModules: {
        text: '...and/or \'Filter\' field to specify which modules you want to see.',
        attachTo: '.options__filter left',
        buttons: buttons.step
      },

      stickyNodes: {
        text: 'If you\'d like your nodes to stay where you drag them - make nodes sticky.<br/><br/>Double click node to unstick.',
        attachTo: '.options__sticky-nodes left',
        buttons: buttons.step
      },

      triggerComponents: {
        text: 'You can filter components nodes by component type.',
        attachTo: '.trigger-components right',
        buttons: buttons.step
      },

      search: {
        text: 'To focus on particular component or module, use search field.',
        attachTo: '.search right',
        buttons: buttons.step
      },

      saving: {
        text: 'The graph is automatically updated with dependencies as you work on your app and refresh the browser.<br/><br/>All options are saved for each of your projects.',
        buttons: buttons.step
      },

      finish: {
        text: 'That\'s it! :) Hope you enjoy.<br/><br/>You can restart this tour by clicking \'Tutorial\' in the bottom right corner.',
        attachTo: '.search right',
        buttons: buttons.finish
      }

    };

    _.each(steps, function(step) {
      tour.addStep(step);
    });

    return tour;

  });
