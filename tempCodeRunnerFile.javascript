const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Simulated data for demo purposes
let drones = [
    { droneId: 'DR-001', status: 'idle', location: { lat: 34.0522, lon: -118.2437 }, cargo: 'Food Supplies' },
    { droneId: 'DR-002', status: 'in-progress', location: { lat: 35.6895, lon: 139.6917 }, cargo: 'Medical Supplies' },
    { droneId: 'DR-003', status: 'completed', location: { lat: 40.7128, lon: -74.0060 }, cargo: 'Water Bottles' },
];

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send the initial drone data
    socket.emit('drone_update', drones);

    // Simulate real-time updates (change drone data every few seconds)
    setInterval(() => {
        drones[0].status = 'in-progress';
        drones[0].location = { lat: 34.0522, lon: -118.2437 };
        io.emit('drone_update', drones);
    }, 5000);

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
