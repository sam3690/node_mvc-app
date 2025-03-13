const CScreening = require('../models/models');
const models = require('../models/models');

const controller = {
    async showDashboard(req, res) {
        try {
            const cFollowUp = await models.ChildFollowUp.getData();
            const screenings = await models.CScreening.getTop10();
            const CDateByY = await models.CDateByYear.getData();
            const CDistricts = await models.CDistricts.getData();
            console.log(CDistricts);
            
            
            res.render('index', {
                cFollowUp: cFollowUp,
                screenings:screenings,
                ch23: CDateByY.childByYear2023, 
                ch24: CDateByY.childByYear2024, 
                ch25: CDateByY.childByYear2025,
                totalUnderFive: CDateByY.totalUnderFive,
                CDistricts: CDistricts,
            }); // Pass data and type
        } catch (error) {
            res.status(500).send('Error fetching data');
        }
    },
};

module.exports = controller;