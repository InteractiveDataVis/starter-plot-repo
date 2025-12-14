import * as d3 from 'd3';

function generateFakeData(count = 24) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => ({
    time: new Date(now.getTime() - (count - i) * 3600000),
    temperature: 60 + Math.random() * 30 + Math.sin(i / 4) * 10
  }));
}

const data = generateFakeData();

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 200 - margin.top - margin.bottom;

const x = d3.scaleTime()
  .domain(d3.extent(data, d => d.time))
  .range([0, width]);

const y = d3.scaleLinear()
  .domain(d3.extent(data, d => d.temperature))
  .range([height, 0]);

const svg = d3.select('#d3-svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

svg.append('g')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(x));

svg.append('g')
  .call(d3.axisLeft(y));

const line = d3.line()
  .x(d => x(d.time))
  .y(d => y(d.temperature))
  .curve(d3.curveMonotoneX);

svg.selectAll('path.line')
  .data([data])
  .join('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('stroke', 'lightgray')
  .attr('stroke-width', 2)
  .attr('d', line);
