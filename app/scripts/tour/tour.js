'use strict';

angular.module('ngDependencyGraph')
  .factory('tour', function() {
    var tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
        scrollTo: true
      }
    });

    tour.addStep('example-step', {
      text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
      attachTo: '.info-panel left',
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    return tour;

  });
