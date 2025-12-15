import * as d3 from 'd3';

import '../main.css';

function generateData(count = 100) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
  }));
}

let data = generateData();

function addPoints() {
  data = [...data, ...generateData(10)];
  console.log('Added 5 points, total:', data.length);
  drawPoints();
}

function removePoints() {
  data = data.slice(0, -10);
  console.log('Removed 5 points, total:', data.length);
  drawPoints();
}

function refreshPoints() {
  const amount = data.length === 0 ? 100 : data.length;
  data = generateData(amount);
  console.log('Refreshed with', amount, 'new points');
  drawPoints();
}

document.getElementById('add-points').addEventListener('click', addPoints);
document.getElementById('remove-points').addEventListener('click', removePoints);
document.getElementById('refresh-points').addEventListener('click', refreshPoints);

function drawPoints() {
  const svg = d3.select('#d3-scatter');

  const x = d3.scaleLinear()
    .domain([0, 100])
    .range([10, 790]);

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([10, 290]);

  const r = d3.scaleSqrt()
    .domain(d3.extent(data, d => d.z))
    .range([2, 4]);

  svg.selectAll('circle')
    .data(data, (d, i) => i)
    .join(
      enter => enter.append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', d => r(d.z))
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', 1),
      update => update.transition()
        .duration(500)
        .delay((d, i) => i * 10)
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', d => r(d.z)),
      exit => exit
        .transition()
        .duration(500)
        .delay(100)
        .attr('fill', 'pink')
        .attr('r', 0)
        .remove()
    )
}

drawPoints();