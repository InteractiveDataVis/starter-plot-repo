import * as Plot from '@observablehq/plot';

async function renderWeatherPlot() {
  // weather for CUNY from the National Weather Service API: https://www.weather.gov/documentation/services-web-api
  const response = await fetch('https://api.weather.gov/gridpoints/OKX/34,37/forecast/hourly');
  const data = await response.json();
  
  // Get first 72 hours of forecast data
  const hourlyData = data.properties.periods.map(period => ({
    time: new Date(period.startTime),
    temperature: period.temperature
  }));

  const plot = Plot.plot({
    width: 800,
    height: 200,
    title: 'Temperature Forecast for CUNY',
    x: { label: 'Time', type: 'time', padding: 0.05 },
    y: { label: 'Temperature (°F)', padding: 0.05 },
    marks: [
      Plot.ruleX([new Date()], { stroke: 'gray', strokeWidth: 2 }),
      Plot.text([new Date()], { x: d => d, text: () => 'now', dy: 0, dx: 14, frameAnchor: 'top', fill: 'gray' }),
      Plot.lineY(hourlyData, { 
        x: 'time', 
        y: 'temperature', 
        strokeWidth: 2,
        strokeOpacity: 0.5 
      }),
      Plot.dot(hourlyData, { 
        x: 'time', 
        y: 'temperature', 
        r: 1,
        stroke: 'none',
        fill: 'white',
        tip: { 
          fill: '#5c5c88',
        }, 
      })
    ]
  });

  document.querySelector('#plot-container').append(plot);
}

renderWeatherPlot();

