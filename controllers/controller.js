const CScreening = require('../models/models');
const models = require('../models/models');

const controller = {
    async showDashboard(req, res) {
        try {
            const cFollowUp = await models.ChildFollowUp.getData();
            const screenings = await models.CScreening.getTop10();
            const CDateByY = await models.CDateByYear.getData();
            res.render('index', {cFollowUp,screenings, CDateByY}); // Pass data and type
        } catch (error) {
            res.status(500).send('Error fetching data');
        }
    },
};

module.exports = controller;