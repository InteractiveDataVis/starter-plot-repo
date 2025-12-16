import * as d3 from 'd3';
// Importing css file here (instead of a link in index.html) because of the vite dev server / bundler
import './main.css';

const svg = d3.select("#d3-svg");
svg.style("border", "2px solid black");

svg.on("click", (event) => {
  // console.log(event);
  const position = d3.pointer(event);
  // console.log(position);

  const color = d3.hsl(Math.random() * 360, 1, 0.5);
  // console.log(color);

  const circle = svg.append("circle")
    .attr("cx", position[0])
    .attr("cy", position[1])
    .attr("r", 5)
    .attr("fill", color)

  circle.on("click", function (event) {
    // console.log(this)
    d3.select(this).attr("r", 10);

    const thisCircle = d3.select(this);
    const interval = setInterval(() => {
      thisCircle.attr("r", parseInt(thisCircle.attr("r")) + 1);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
    }, 1000);
  });
});

// function addCircleBehavior(circle) {
//   let interval = null;
//   let isDragging = false;

//   const drag = d3.drag()
//     .on('start', function(event) {
//       isDragging = false;
//       interval = setInterval(() => {
//         if (!isDragging) {
//           const c = d3.select(this);
//           c.attr('r', +c.attr('r') + 1);
//         }
//       }, 50);
//     })
//     .on('drag', function(event) {
//       isDragging = true;
//       d3.select(this)
//         .attr('cx', event.x)
//         .attr('cy', event.y);
//     })
//     .on('end', () => {
//       clearInterval(interval);
//     });

//   circle
//     .on('click', event => event.stopPropagation())
//     .call(drag);
// }

// svg.on('click', function(event) {
//   const [x, y] = d3.pointer(event);
//   const color = d3.hsl(Math.random() * 360, 0.7, 0.5);
//   const circle = svg.append('circle')
//     .attr('cx', x)
//     .attr('cy', y)
//     .attr('r', 10)
//     .attr('fill', color);
//   addCircleBehavior(circle);
// });