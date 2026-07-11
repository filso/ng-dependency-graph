'use strict';

// D3 force-directed graph of the current view.
angular.module('ngDependencyGraph').directive('dgGraph', function ($rootScope, Const, currentView, util) {
  return {
    link(scope, elm) {
      const ZOOM_EXTENT = [0.1, 3];
      let links, nodes, nodesEnter;

      // The element may not be laid out yet when the directive links
      // (it's inside ng-include) - re-measure before every use.
      let width = elm.width() || 960;
      let height = elm.height() || 640;

      function measure() {
        width = elm.width() || width;
        height = elm.height() || height;
      }

      const force = d3.layout
        .force()
        .size([width, height])
        .linkStrength(0.5)
        .friction(0.85)
        .linkDistance(100)
        .charge(-400)
        .gravity(0.2)
        .on('tick', tick);

      const drag = force.drag().on('dragstart', dragstart);

      // Once the initial simulation cools down, zoom/pan so the whole graph
      // is in view (layouts of big graphs spread out beyond the viewport).
      let fittedOnce = false;
      function fitOnce() {
        if (fittedOnce) {
          return;
        }
        fittedOnce = true;
        fitToViewport();
      }
      force.on('end', fitOnce);
      // the simulation cools down slowly for big graphs - don't wait for it
      setTimeout(fitOnce, 3000);

      function fitToViewport() {
        measure();
        const graphNodes = force.nodes();
        if (graphNodes.length === 0) {
          return;
        }
        const xs = graphNodes.map((n) => n.x);
        const ys = graphNodes.map((n) => n.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        const margin = 60;
        const scale = Math.max(
          ZOOM_EXTENT[0],
          Math.min(1, width / (maxX - minX + margin), height / (maxY - minY + margin)),
        );
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        zoom
          .scale(scale)
          .translate([width / 2 - scale * cx, height / 2 - scale * cy])
          .event(svg);
      }

      function centerOnNode(d) {
        if (!d || force.nodes().indexOf(d) === -1) {
          return;
        }
        measure();
        const scale = zoom.scale();
        const x = -(scale * d.x - width / 2);
        const y = -(scale * d.y - height / 2);
        zoom.translate([x, y]).event(svg);
      }

      function update() {
        measure();
        force.size([width, height]);

        const currentGraph = currentView.graph;
        force.nodes(currentGraph.nodes).links(currentGraph.links);

        links = svg.selectAll('.link').data(force.links(), (d) => d._id);

        links
          .enter()
          .insert('line', ':first-child') // links render below nodes -> prepend
          .attr('class', 'link')
          .attr('marker-end', 'url(#end)');
        links.exit().remove();

        nodes = svg.selectAll('.node').data(force.nodes(), (d) => d._id);

        nodesEnter = nodes
          .enter()
          .append('g')
          .attr('class', (d) => d.type)
          .classed('node', true)
          .on('mousedown', nodeClick)
          .on('dblclick', dblclick)
          .call(drag);

        nodesEnter.append('circle');

        nodesEnter
          .append('text')
          .attr('x', 12)
          .attr('dy', '.35em')
          .text((d) => d.name);

        if (currentView.options.stickyNodesEnabled === false) {
          force.nodes().forEach((node) => {
            node.fixed = false;
          });
        }
        nodes.classed('selected', (d) => d === currentView.selectedNode).classed('fixed', (d) => d.fixed);

        nodes.exit().remove();
        force.start();
      }

      function tick() {
        links
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        nodes.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
      }

      function nodeClick(d) {
        $rootScope.$apply(function () {
          currentView.chooseNode(d);
        });
      }

      function zoomListener() {
        let target = svg;

        // Add transition unless the user is panning (mousemove) or zooming (wheel)
        if (!d3.event.sourceEvent || ['mousemove', 'wheel'].indexOf(d3.event.sourceEvent.type) === -1) {
          target = target.transition();
        }
        target.attr('transform', 'translate(' + d3.event.translate + ') scale(' + d3.event.scale + ')');
      }

      // Sticky nodes: drag pins a node, double-click releases it
      function dblclick(d) {
        d3.select(this).classed('fixed', (d.fixed = false));
        d3.event.stopImmediatePropagation();
      }

      function dragstart(d) {
        if (currentView.options.stickyNodesEnabled) {
          d3.select(this).classed('fixed', (d.fixed = true));
        }
      }

      scope.$on(Const.Events.CHOOSE_NODE, function (event, d, translate) {
        if (force.nodes().indexOf(d) === -1) {
          return; // node is filtered out, not visible
        }

        if (translate) {
          centerOnNode(d);
        }
        update();
      });

      scope.$watch('currentView.options.stickyNodesEnabled', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal === false) {
          update();
        }
      });

      const zoom = d3.behavior.zoom().scaleExtent(ZOOM_EXTENT).on('zoom', zoomListener);

      const svg = d3
        .select(elm[0])
        .append('svg')
        .on('mousedown', function () {
          // Allow panning only on the svg element itself,
          // otherwise stop propagation to the zoom behaviour
          if (d3.event.target.tagName !== 'svg') {
            d3.event.stopImmediatePropagation();
          }
        })
        .call(zoom)
        .append('g');

      // Arrow marker definition for link ends
      svg
        .append('svg:defs')
        .selectAll('marker')
        .data(['end'])
        .enter()
        .append('svg:marker')
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

      const debouncedUpdate = util.debounce(update, 100);
      scope.$on(Const.Events.UPDATE_GRAPH, debouncedUpdate);
      debouncedUpdate();
    },
  };
});
