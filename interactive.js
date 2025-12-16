import * as d3 from 'd3';
// Importing css file here (instead of a link in index.html) because of the vite dev server / bundler
import './main.css';

function generateData(count = 100) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
  }));
}

let data = generateData()
console.log("data", data)

function addPoints() {
  data = [...data, ...generateData(10)];
  console.log('Added 10 points, total:', data.length);
  draw();
}

function removePoints() {
  data = data.slice(0, -10);
  console.log('Removed 10 points, total:', data.length);
  draw();
}


function refreshPoints() {
  const amount = data.length === 0 ? 100 : data.length;
  data = generateData(amount);
  console.log('Refreshed with', amount, 'new points');
  draw();
}

document.getElementById('add-points').addEventListener('click', addPoints);
document.getElementById('remove-points').addEventListener('click', removePoints);
document.getElementById('refresh-points').addEventListener('click', refreshPoints);


function draw() {

  const svg = d3.select("#d3-svg")

  const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 800])

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 300])
  
  const circles = svg.selectAll("circle")
    .data(data)
    // .join("circle")
    .join(
      enter => enter.append("circle")
        .attr("stroke", "black")
        .attr("r", 0)
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .transition()
        .duration(1000)
        .attr("r", 5),
      update => update
        .attr("fill", "black")
        .transition()
        .duration(3000)
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y)),
      exit => exit
        .attr("fill", "red")
        .transition()
        .duration(1000)
        .attr("r", 0)
        .remove()
    ).attr("fill", (d, i) => d.x < 50 ? "red" : "black")
}

draw();