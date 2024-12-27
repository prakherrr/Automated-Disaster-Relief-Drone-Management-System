// Initialize the Socket.io client
const socket = io('http://localhost:5000'); // Replace with your server URL

// Sample Data for the drones (this will be updated by real-time data in production)
const drones = [
    { droneId: 'DR-001', status: 'idle', location: { lat: 34.0522, lon: -118.2437 }, cargo: 'Food Supplies' },
    { droneId: 'DR-002', status: 'in-progress', location: { lat: 35.6895, lon: 139.6917 }, cargo: 'Medical Supplies' },
    { droneId: 'DR-003', status: 'completed', location: { lat: 40.7128, lon: -74.0060 }, cargo: 'Water Bottles' },
];

// Function to update the drone status table
function updateDroneTable(drones) {
    const tableBody = document.querySelector('#drone-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    drones.forEach(drone => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${drone.droneId}</td>
            <td>${drone.status}</td>
            <td>Lat: ${drone.location.lat}, Lon: ${drone.location.lon}</td>
            <td>${drone.cargo}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to update the mission list
function updateMissionList(missions) {
    const missionsList = document.getElementById('missions-list');
    missionsList.innerHTML = ''; // Clear existing missions

    missions.forEach(mission => {
        const missionDiv = document.createElement('div');
        missionDiv.classList.add('mission');
        missionDiv.innerHTML = `
            <h4>Mission ID: ${mission.droneId}</h4>
            <p>Status: ${mission.status}</p>
            <p>Location: Lat: ${mission.location.lat}, Lon: ${mission.location.lon}</p>
            <p>Cargo: ${mission.cargo}</p>
        `;
        missionsList.appendChild(missionDiv);
    });
}

// Simulate the initial data population
updateDroneTable(drones);
updateMissionList(drones);

// Real-time updates from the backend (Socket.io)
socket.on('drone_update', (data) => {
    // Update the status of the drone in the table
    drones.forEach(drone => {
        if (drone.droneId === data.droneId) {
            drone.status = data.status;
            drone.location = data.location;
        }
    });

    // Re-render the table with updated drone data
    updateDroneTable(drones);
});

// Sample mission updates - Can be expanded for more dynamic data
socket.on('mission_update', (data) => {
    const mission = {
        droneId: data.droneId,
        status: data.status,
        location: data.location,
        cargo: data.cargo
    };

    updateMissionList([mission]);
});
