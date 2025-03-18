const models = require('../models/models');
const dataPoll = require('../dataPoll');

const controller = {
    async showDashboard(req, res) {
        try {
            // Fetch initial data for page rendering
            const cFollowUp = await models.ChildFollowUp.getData();
            const screenings = await models.CScreening.getTop10();
            const CDateByY = await models.CDateByYear.getData();
            const CDistricts = await models.CDistricts.getData();  
            const screeningStats = await models.totalSreenings.getData();
            
            // Render the page with initial data
            res.render('index', {
                cFollowUp: cFollowUp,
                screenings: screenings,
                ch23: CDateByY.childByYear2023, 
                ch24: CDateByY.childByYear2024, 
                ch25: CDateByY.childByYear2025,
                totalUnderFive: CDateByY.totalUnderFive,
                CDistricts: CDistricts,            
                screeningStats: screeningStats    
            });
            
            // Start data polling if not already started
            if (!req.app.get('polling')) {
                const io = req.app.get('io');
                const pollInterval = dataPoll.startPolling(io);
                req.app.set('polling', pollInterval);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data: ' + error.message);
        }
    },
};

module.exports = controller;