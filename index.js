$(document).ready(function() {
    // Global constants for canvas properties
    const canvas = $('#eulerGraphCanvas')[0];
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const lineLength = 200;
    let angle = 0;  // Global angle variable

    // Function to clear the canvas
    const clearCanvas = (cxt, cnv) => cxt.clearRect(0, 0, cnv.width, cnv.height);

    // Function to draw axes
    const drawAxes = () => {
        context.beginPath();
        context.moveTo(0, centerY); 
        context.lineTo(canvas.width, centerY); // X-axis
        context.moveTo(centerX, 0); 
        context.lineTo(centerX, canvas.height); // Y-axis
        context.strokeStyle = 'white';
        context.stroke();
    };

    // Function to draw Euler's formula (complex number)
    const drawEulerFormula = () => {
        const complex = math.exp(math.complex(0, angle)); // e^(i * angle)
        const x = centerX + complex.re * lineLength; // Real part (cos(angle))
        const y = centerY - complex.im * lineLength; // Imaginary part (-sin(angle))

        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI); // Circle to represent the complex number
        context.fillStyle = 'blue';
        context.fill();

        context.beginPath();
        context.moveTo(centerX, centerY); // Origin
        context.lineTo(x, centerY); // Line along the real axis
        context.strokeStyle = 'green';
        context.stroke();

        context.beginPath();
        context.moveTo(centerX, centerY); // Origin
        context.lineTo(centerX, y); // Line along the imaginary axis
        context.strokeStyle = 'red';
        context.stroke();

        // Labels for clarity
        context.fillStyle = 'blue';
        context.fillText('e^(i*angle)', x + 5, y - 5); // Label the complex number
        context.fillStyle = 'green';
        context.fillText('cos(angle)', x + 5, centerY + 15); // Label for real part
        context.fillStyle = 'red';
        context.fillText('sin(angle)', centerX + 15, y - 5); // Label for imaginary part
    };

    // Function to draw and animate the graph
    const drawGraph = () => {
        clearCanvas(context, canvas);
        drawAxes();
        drawEulerFormula();
    };

    // Function to animate the Euler's formula with increasing angle
    const animate = () => {
        angle += Math.PI / 180; // Increment the angle by 1 degree per frame
        drawGraph();
        requestAnimationFrame(animate); // Loop the animation
    };

    // Start the animation
    animate();

    // Rotating line canvas animation
    const rotatingLineCanvas = $('#rotatingLineCanvas')[0];
    const rotatingLineCtx = rotatingLineCanvas.getContext('2d');
    const lineLength2 = 150; // Length of the first rotating line
    const lineLength3 = 70;  // Length of the second rotating line
    let angle2 = 0;
    let angle3 = 0; // Second line angle

    rotatingLineCtx.globalAlpha = 0.1; // Set global alpha for fading effect

    // Function to draw rotating lines
    const drawRotatingLines = () => {
        const complex1 = math.exp(math.complex(0, angle2)); // First line: e^(i * angle2)
        const x1 = centerX + complex1.re * lineLength2; // Real part (cos(angle2))
        const y1 = centerY - complex1.im * lineLength2; // Imaginary part (-sin(angle2))

        rotatingLineCtx.beginPath();
        rotatingLineCtx.moveTo(centerX, centerY);
        rotatingLineCtx.lineTo(x1, y1); // First line to calculated point
        rotatingLineCtx.strokeStyle = 'lightblue';
        rotatingLineCtx.lineWidth = 2;
        rotatingLineCtx.stroke();

        // Second rotating line
        const complex2 = math.exp(math.complex(0, angle3)); // e^(i * angle3)
        const x2 = x1 + complex2.re * lineLength3; // Second line starts at x1, y1
        const y2 = y1 - complex2.im * lineLength3;

        rotatingLineCtx.beginPath();
        rotatingLineCtx.moveTo(x1, y1);
        rotatingLineCtx.lineTo(x2, y2); // Draw the second line
        rotatingLineCtx.strokeStyle = 'white';
        rotatingLineCtx.lineWidth = 2;
        rotatingLineCtx.stroke();
    };

    const animateRotatingLines = () => {
        // Get current values of the sliders
        const line1 = parseFloat($("#line1").val());
        const line2 = parseFloat($("#line2").val());

        angle2 += Math.PI / line1; // First line increments by 1 degree per frame
        angle3 += Math.PI / line2; // Second line increments faster (2 degrees per frame)
        drawRotatingLines();
        requestAnimationFrame(animateRotatingLines); // Loop the animation
    };

    $('#line1, #line2').on('input', () => {
        clearCanvas(rotatingLineCtx, rotatingLineCanvas); // Clear canvas when slider value changes
    });

    // Start the rotating line animation
    animateRotatingLines();

    
});
