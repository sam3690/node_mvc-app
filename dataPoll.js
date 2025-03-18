// dataPoll.js
const models = require('./models/models');

// Function to fetch all data
async function fetchAllData() {
    try {
        const screenings = await models.CScreening.getTop10();
        const cFollowUp = await models.ChildFollowUp.getData();
        const childrenByYear = await models.CDateByYear.getData();
        const districts = await models.CDistricts.getData();
        const screeningStats = await models.totalSreenings.getData();
        
        return {
            screenings,
            cFollowUp,
            childrenByYear,
            districts,
            screeningStats
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Start polling and emit updates via Socket.IO
function startPolling(io, interval = 10000) {
    console.log(`Starting data polling every ${interval}ms`);
    
    // Initial data fetch
    fetchAllData().then(data => {
        if (data) {
            io.emit('data-update', data);
        }
    });
    
    // Set interval for regular updates
    const pollInterval = setInterval(async () => {
        const data = await fetchAllData();
        if (data) {
            io.emit('data-update', data);
            console.log('Data sent to all clients');
        }
    }, interval);
    
    return pollInterval;
}

module.exports = { startPolling, fetchAllData };