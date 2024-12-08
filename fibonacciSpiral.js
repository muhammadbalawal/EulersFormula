$(document).ready(function () {
    const canvas = $('#fibonacciCanvas')[0];
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function generateFibonacci(n) {
        const sequence = [1, 1];
        for (let i = 2; i < n; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }
        return sequence;
    }

    function drawFibonacciSpiral(maxFibonacci, scale) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const fibonacci = generateFibonacci(maxFibonacci);
        let x = centerX;
        let y = centerY;
        let direction = 0; 

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 0; i < fibonacci.length; i++) {
            const radius = fibonacci[i] * scale;
            const startAngle = (direction * Math.PI) / 2;
            const endAngle = startAngle + Math.PI / 2;

            ctx.arc(x, y, radius, startAngle, endAngle);

            // Update center for next arc
            switch (direction) {
                case 0: x += radius * 2; break;
                case 1: y += radius * 2; break;
                case 2: x -= radius * 2; break;
                case 3: y -= radius * 2; break;
            }

            direction = (direction + 1) % 4;
        }

        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function updateCanvas() {
        const maxFibonacci = parseInt($('#numFibonacci').val());
        const scale = parseInt($('#scaleFactor').val());
        drawFibonacciSpiral(maxFibonacci, scale);
    }

    // Initial draw
    updateCanvas();

    // Event listeners for user controls
    $('#numFibonacci, #scaleFactor').on('input', updateCanvas);
    $('#resetCanvas').on('click', () => {
        $('#numFibonacci').val(8);
        $('#scaleFactor').val(15);
        updateCanvas();
    });
});
