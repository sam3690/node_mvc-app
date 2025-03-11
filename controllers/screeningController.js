// const CScreening = require('../models/CScreening');

// const screeningController = {
//     async getTop10Screenings(req, res) {
//         try {
//             const screenings = await CScreening.getTop10();
//             res.json(screenings);
//         } catch (error) {
//             res.status(500).json({ error: 'Error fetching screenings' });
//         }
//     }
// };

// module.exports = screeningController;

const CScreening = require('../models/CScreening');

const screeningController = {
    async showDashboard(req, res) {
        try {
            const screenings = await CScreening.getTop10();
            res.render('index', { screenings }); 
        } catch (error) {
            res.status(500).send('Error fetching data');
        }
    }
};

module.exports = screeningController;