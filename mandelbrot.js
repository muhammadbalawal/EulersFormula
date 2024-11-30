
$(document).ready(function () {
  const canvas = $('#mandelbrotCanvas')[0];
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Function to draw the Mandelbrot set
  function drawMandelbrot(zoom, offsetX, offsetY, maxIterations) {
    const imgData = ctx.createImageData(width, height);

    for (let px = 0; px < width; px++) {
      for (let py = 0; py < height; py++) {
        const x0 = px / zoom + offsetX;
        const y0 = py / zoom + offsetY;

        let x = 0;
        let y = 0;
        let iteration = 0;

        while (x * x + y * y <= 4 && iteration < maxIterations) {
          const xTemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xTemp;
          iteration++;
        }

        const color = iteration === maxIterations ? 0 : Math.floor(255 * iteration / maxIterations);
        const pixelIndex = (py * width + px) * 4;
        imgData.data[pixelIndex] = color;       // Red
        imgData.data[pixelIndex + 1] = color;   // Green
        imgData.data[pixelIndex + 2] = color;   // Blue
        imgData.data[pixelIndex + 3] = 255;     // Alpha
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  // Get initial values from inputs
  const inputs = {
    zoom: $('#zoom'),
    offsetX: $('#offsetX'),
    offsetY: $('#offsetY'),
    iterations: $('#iterations')
  };

  // Function to get updated values and redraw
  function updateAndDraw() {
    const zoom = parseFloat(inputs.zoom.val());
    const offsetX = parseFloat(inputs.offsetX.val());
    const offsetY = parseFloat(inputs.offsetY.val());
    const maxIterations = parseInt(inputs.iterations.val(), 10);

    drawMandelbrot(zoom, offsetX, offsetY, maxIterations);
  }

  // Attach input listeners for real-time updates
  Object.values(inputs).forEach(input => {
    input.on('input', updateAndDraw);
  });

  // Initial draw
  updateAndDraw();
});