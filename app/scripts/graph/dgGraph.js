'use strict';

angular.module('ngDependencyGraph')
  .directive('dgGraph', function($rootScope, $timeout, appDeps, dev, Component, Const, currentView) {

    return {
      link: function(scope, elm, attrs) {

        function update() {
          var currentGraph = currentView.graph;
          force.nodes(currentGraph.nodes)
            .links(currentGraph.links);

          links = svg.selectAll('.link')
            .data(force.links(), _.property('_id'));

          links.enter()
            .insert("line", ":first-child") // this needs to be rendered first -> prepend
            .attr('class', 'link')
            .attr('marker-end', 'url(#end)');
          links.exit().remove();

          nodes = svg.selectAll('.node')
            .data(force.nodes(), _.property('_id'));

          /**
           * Nodes enter
           */
          nodesEnter = nodes
            .enter()
            .append('g')
            .attr('class', _.property('type'))
            .classed('node', true)
            .on('mousedown', nodeClick)
            .call(force.drag);

          nodesEnter.append('circle');
            // .attr('r', 8);

          nodesEnter.append('text')
            .attr('x', 12)
            .attr('dy', '.35em')
            .text(function(d) {
              return d.name;
            });

          /**
           * Nodes update
           */
          nodes
            .classed('selected', function(d) {
              return d === currentView.selectedNode;
            });


          /**
           * Nodes remove
           */
          nodes.exit().remove();

          force
            .size([width, height])
            .linkDistance(80)
            .charge(-400)
            .on('tick', tick)
            .start();
        }


        function tick() {
          links
            .attr('x1', function(d) {
              return d.source.x;
            })
            .attr('y1', function(d) {
              return d.source.y;
            })
            .attr('x2', function(d) {
              return d.target.x;
            })
            .attr('y2', function(d) {
              return d.target.y;
            });

          nodes
            .attr('transform', function(d) {
              return 'translate(' + d.x + ',' + d.y + ')';
            });
        }

        function nodeClick(d) {
          $rootScope.$apply(function() {
            currentView.chooseNode(d);
          });
        }

        function zoomListener() {
          var tmp = svg;

          // add transtion if user is not panning (move) or zooming (wheel)
          if (!d3.event.sourceEvent || ['mousemove', 'wheel'].indexOf(d3.event.sourceEvent.type) === -1) {
            tmp = tmp.transition();
          }
          tmp.attr('transform',
            'translate(' + d3.event.translate + ')' +
            ' scale(' + d3.event.scale + ')');
        }   


        scope.$on('chooseNode', function(event, d) {
          if (force.nodes().indexOf(d) === -1) { // if d is not present, it's not visible
            return;
          }
          var x = (width/2 - d.x);
          var y = (height/2 - d.y);

          zoom.translate([x, y]).event(svg);
          update();

        });

        var links, nodes, nodesEnter;

        var width = elm.width();
        var height = elm.height();

        var force = d3.layout.force();

        var zoom = d3.behavior.zoom()
          .scaleExtent([0.5 ,2])
          .on('zoom.bar', zoomListener);

        var svg = d3.select(elm[0]).append('svg')
          .call(zoom)
          .append('g');


        /**
         * Definitions of markers
         */
        svg.append('svg:defs').selectAll('marker')
            .data(['end'])      // Different link/path types can be defined here
          .enter().append('svg:marker')    // This section adds in the arrows
            .attr('id', String)
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 18)
            .attr('refY', 0)
            .attr('markerWidth', 8)
            .attr('markerHeight', 8)
            .attr('fill', '#eee')
            .attr('orient', 'auto')
          .append('svg:path')
            .attr('d', 'M0,-3L10,0L0,3');

          
        update();
        scope.$on('updateGraph', update);


      }
    };

  });
