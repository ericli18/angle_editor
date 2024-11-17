let socket;

function connectWebSocket() {
    console.log('Attempting to connect to WebSocket...');
    socket = new WebSocket('ws://localhost:8000/ws');

    socket.onopen = function(event) {
        console.log('WebSocket is open now.');
    };

    socket.onmessage = function(event) {
        console.log('WebSocket message received:', event.data);
    };

    socket.onclose = function(event) {
        console.log('WebSocket is closed now. Reconnecting...');
        setTimeout(connectWebSocket, 1000); // Attempt to reconnect every second
    };

    socket.onerror = function(error) {
        console.error('WebSocket error observed:', error);
    };
}

connectWebSocket();

document.getElementById('sendAngle').addEventListener('click', function() {
    const angleInput = document.getElementById('angleInput').value;
    const angle = parseFloat(angleInput);

    if (!isNaN(angle)) {
        console.log('Sending angle:', angle);
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(angle.toString());
        }
    } else {
        console.error('Invalid angle input');
    }
});
