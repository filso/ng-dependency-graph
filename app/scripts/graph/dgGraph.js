'use strict';

angular.module('ngDependencyGraph')
  .directive('dgGraph', function($rootScope, $timeout, dev, Component, Const, currentView) {

    return {
      link: function(scope, elm, attrs) {

        function update() {
          console.log('update graph!');
          var currentGraph = currentView.graph;
          force.nodes(currentGraph.nodes)
            .links(currentGraph.links);

          links = svg.selectAll('.link')
            .data(force.links(), _.property('_id'));

          links.enter()
            .insert('line', ':first-child') // this needs to be rendered first -> prepend
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
            .call(drag);

          nodesEnter.append('circle');

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
            'translate(' + d3.event.translate + ') ' +
            ' scale(' + d3.event.scale + ')');
        }   


        scope.$on(Const.Events.CHOOSE_NODE, function(event, d, translate) {
          if (force.nodes().indexOf(d) === -1) { // if d is not present, it's not visible
            return;
          }

          if (translate) {
            var scale = zoom.scale();
            var x = -(scale * d.x - width/2);
            var y = -(scale * d.y - height/2);

            zoom.translate([x, y]).event(svg);
          }
          update();

        });

        var links, nodes, nodesEnter;

        var width = elm.width();
        var height = elm.height();

        var force = d3.layout.force()
          .size([width, height])
          .linkStrength(0.5)
          .friction(0.85)
          .linkDistance(100)
          .charge(-400)
          .gravity(0.05)
          // .linkDistance(120)
          // .charge(-800)
          .on('tick', tick);

        var drag = force.drag()
          .on("dragstart", dragstart);


        // TODO implement sticky dragging functionality
        function dblclick(d) {
          d3.select(this).classed("fixed", d.fixed = false);
        }

        function dragstart(d) {
          if (currentView.stickyNodesEnabled) {
            d3.select(this).classed("fixed", d.fixed = true);
          }
        }



        var zoom = d3.behavior.zoom()
          .scaleExtent([0.5 ,2])
          .on('zoom', zoomListener);

        var svg = d3.select(elm[0]).append('svg')
          .on('mousedown', function() {
            // Allow moving only on svg element,
            // otherwise stop propagation to zoom behaviour
            if (d3.event.target.tagName !== 'svg') {
              d3.event.stopImmediatePropagation();
            }
          })
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

        scope.$on(Const.Events.UPDATE_GRAPH, _.debounce(update, 100));

      }
    };

  });
