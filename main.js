import * as d3 from 'd3'

// const svg = d3.select("#d3-svg");
// const width = svg.attr("width");
// const height = svg.attr("height");

// const amountOfSnow = 10000;
// const snowFlakes = d3.range(amountOfSnow).map(d => ({
//   x: Math.random() * width,
//   r: Math.random() * 4
// }))
// console.log(snowFlakes)

// function snow () {
//   svg.selectAll(".snow")
//     .data(snowFlakes)
//     .join(enter => 
//       enter.append("circle")
//         .attr("cy", 0)
//         .transition()
//         .ease(d3.easeLinear)
//         .delay((d, i) => i * 20)
//         .duration(5000)
//         .attr("cy", height),
//     )
//     .attr("class", "snow")
//     .attr("r", d => d.r)
//     .attr("cx", d => d.x)
//     .attr("fill", "white")
//     .attr("stroke", "grey")
// }

// snow()

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
    .attr('cy', height - size / 2)
    .attr('cx', x + drift)
    .transition().delay(1000).attr("opacity", "0")
    .remove();
}

// Spawn snowflakes at intervals
setInterval(createSnowflake, 50);

// Create initial batch
for (let i = 0; i < 30; i++) {
  setTimeout(createSnowflake, i * 30);
}