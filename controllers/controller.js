const CScreening = require('../models/models');
const models = require('../models/models');

const controller = {
    async showDashboard(req, res) {
        try {
            const cFollowUp = await models.ChildFollowUp.getData();
            const screenings = await models.CScreening.getTop10();
            res.render('index', {cFollowUp,screenings}); // Pass data and type
        } catch (error) {
            res.status(500).send('Error fetching data');
        }
    },

    // async showDash(req, res) {
    //     try {
    //         const cFollowUp = await ChildFollowUp.getData();
    //         res.render('index', { data: cFollowUp, type: 'cFollowUp' }); // Pass data and type
    //     } catch (error) {
    //         res.status(500).send('Error fetching data');
    //     }
    // }
};

module.exports = controller;