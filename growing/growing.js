import * as d3 from 'd3';

import '../main.css';

const svg = d3.select('#d3-grow');

function addCircleBehavior(circle) {
  let interval = null;
  let isDragging = false;

  const drag = d3.drag()
    .on('start', function(event) {
      isDragging = false;
      interval = setInterval(() => {
        if (!isDragging) {
          const c = d3.select(this);
          c.attr('r', +c.attr('r') + 1);
        }
      }, 50);
    })
    .on('drag', function(event) {
      isDragging = true;
      d3.select(this)
        .attr('cx', event.x)
        .attr('cy', event.y);
    })
    .on('end', () => {
      clearInterval(interval);
    });

  circle
    .on('click', event => event.stopPropagation())
    .call(drag);
}

svg.on('click', function(event) {
  const [x, y] = d3.pointer(event);
  const color = d3.hsl(Math.random() * 360, 0.7, 0.5);
  const circle = svg.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 10)
    .attr('fill', color);
  addCircleBehavior(circle);
});