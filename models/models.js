const { executeQuery } = require('../config/db');
const jalaali = require('jalaali-js');
const moment = require('moment-jalaali');


class CScreening {
    static async getTop10() {
        const query = `SELECT TOP 10 col_id, cs06, cs08, cs12, cs1502, uc, village FROM [dbo].[CScreening]`;
        return await executeQuery(query);
    }
}

class ChildFollowUp {
    static async getData() {
        const query = `SELECT TOP 10 col_id,district, endingdatetime, fc08, fc15, fc16 FROM [dbo].[CFollowup] where colflag is null`;
        return await executeQuery(query);
    }
}

class CDateByYear{
    static async getData() {        
        let totalUnderFive = 0
        const query = `SELECT cs1401, cs1402, cs1403 FROM [dbo].[CScreening] where colflag is null`;
        return await executeQuery(query)
        .then(data => {
            // console.log(data);
            

            data.forEach(row => {
                // Convert Afghan date to Gregorian date
                const afghanDate = moment(`${row.cs1403}/${row.cs1402}/${row.cs1401}`, 'jYYYY/jMM/jDD');
                const gregorianDate = afghanDate.format('YYYY-MM-DD');
                
                // Calculate age
                const today = moment();
                const birthDate = moment(gregorianDate);
                const ageYears = today.diff(birthDate, 'years');
                // console.log(ageYears);
                if (ageYears <= 5) {
                    totalUnderFive++;
                }
            });
            
            return totalUnderFive;
            
        })
        .catch(err => {
            console.error(err);
        })
    }
}

module.exports = {CScreening, ChildFollowUp, CDateByYear};