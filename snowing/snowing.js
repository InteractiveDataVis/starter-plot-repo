import * as d3 from 'd3';

import '../main.css';

const svg = d3.select('#d3-snow');
const width = 800;
const height = 300;

// Create snowflakes continuously
function createSnowflake() {
  const x = Math.random() * width;
  const size = Math.random() * 4 + 2;
  const duration = Math.random() * 3000 + 2000;
  const drift = (Math.random() - 0.5) * 100;

  svg.append('circle')
    .attr('cx', x)
    .attr('cy', -10)
    .attr('r', size)
    .attr('fill', 'white')
    .attr('opacity', Math.random() * 0.5 + 0.5)
    .transition()
    .duration(duration)
    .ease(d3.easeLinear)
    .attr('cy', height + 10)
    .attr('cx', x + drift)
    .remove();
}

// Spawn snowflakes at intervals
setInterval(createSnowflake, 50);

// Create initial batch
for (let i = 0; i < 30; i++) {
  setTimeout(createSnowflake, i * 30);
}
