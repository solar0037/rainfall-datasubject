import fs from 'fs';

// Function to linearly interpolate between two points
function interpolate(p1, p2, t) {
    return {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t,
        value: Math.round(p1.value + (p2.value - p1.value) * t)
    };
}

// Function to calculate values at points on the lines connecting the four points
function calculateValues(points) {
    let results = [];

    // Interpolate between each pair of points
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            for (let t = 0; t <= 1; t += 0.1) { // Adjust step size as needed
                let interpolatedPoint = interpolate(points[i], points[j], t);
                results.push(interpolatedPoint);
            }
        }
    }

    return results;
}

function generateRainfallMap(calculatedValues) {
    // Generate HTML content
    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>실시간 강수량</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
    </head>
    <body>
        <style>
            body {
                margin: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            canvas {
                background-image: url(cau-map.png);
                width: 100%;
                height: 100%;
            }
        </style>
        <canvas id="myChart"></canvas>
        <script>
            const ctx = document.getElementById('myChart').getContext('2d');
            const data = {
                datasets: [{
                    label: '강수량',
                    data: ${JSON.stringify(calculatedValues)},
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    showLine: true,
                    fill: false,
                    parsing: {
                        xAxisKey: 'x',
                        yAxisKey: 'y'
                    }
                }]
            };
            const config = {
                type: 'scatter',
                data: data,
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
                        }
                    },
                    plugins: {
                        datalabels: {
                            display: true,
                            formatter: function(value, context) {
                                return \`(\${value.x}, \${value.y}): \${value.value}\`;
                            },
                            color: 'black'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let point = context.raw;
                                    return \`(\${point.x}, \${point.y}): \${point.value}\`;
                                }
                            }
                        }
                    }
                }
            };
            const customPlugin = {
                id: 'customPlugin',
                afterDatasetsDraw: (chart) => {
                    const ctx = chart.ctx;
                    chart.data.datasets.forEach((dataset) => {
                        dataset.data.forEach((point) => {
                            const meta = chart.getDatasetMeta(0);
                            const x = meta.data[dataset.data.indexOf(point)].x;
                            const y = meta.data[dataset.data.indexOf(point)].y;
                            ctx.fillText(point.value, x, y);
                        });
                    });
                }
            };
    
            new Chart(ctx, {
                ...config,
                plugins: [customPlugin]
            });
        </script>
    </body>
    </html>
    `;
    
    // Write HTML content to a file
    fs.writeFileSync('public/interpolated_points.html', htmlContent);
    console.log('HTML file generated: interpolated_points.html');
}

// // Example usage
// let points = [
//     { x: 0, y: 0, value: 10 },
//     { x: 1, y: 0, value: 20 },
//     { x: 0, y: 1, value: 30 },
//     { x: 1, y: 1, value: 40 }
// ];

export { interpolate, calculateValues, generateRainfallMap };
