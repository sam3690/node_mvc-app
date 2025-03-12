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
        let childByYear2023 = 0
        let childByYear2024 = 0
        let childByYear2025 = 0
        const query = `SELECT cs08, cs1401, cs1402, cs1403 FROM [dbo].[CScreening] where colflag is null`;
        try{
        
        const data = await executeQuery(query)
        
         
                        

            data.forEach(row => {
                // converting afghan Date of Asssment to Gregorian Format
                const afghanDOA = moment(`${row.cs08}`,'jDD/jMM/jYYYY')
                const gregorianDOA = afghanDOA.format('YYYY-MM-DD');
                
                // Calculate age in years
                const today = moment();
                const birthDate = moment(gregorianDOA);
                const ageYears = today.diff(birthDate, 'years');
                
                // Get the year from the Gregorian date
                const date = new Date(gregorianDOA);
                const year = date.getFullYear();
                
                // Convert Afghan date to Gregorian date format
                const afghanDate = moment(`${row.cs1403}/${row.cs1402}/${row.cs1401}`, 'jYYYY/jMM/jDD');
                const gregorianDate = afghanDate.format('YYYY-MM-DD');
                
                if (year == 2023) {
                    if(ageYears <= 5){
                    childByYear2023++   
                    }
                }else if (year == 2024){
                    if(ageYears <= 5){
                        childByYear2024++   
                        }
                }else if (year == 2025){
                    if(ageYears <= 5){
                        childByYear2025++   
                        }
                }

                });
                return {
                    childByYear2023,
                    childByYear2024,
                    childByYear2025,
                    totalUnderFive: childByYear2023 + childByYear2024 + childByYear2025,
                };
                        
        }
        catch(err){
            console.error(err);
        }
    }
}
// CDateByYear.getData();


class CDistricts {
    static async getData(){
        const query = "SELECT district FROM [dbo].[CScreening] where colflag is null";
        return await executeQuery(query)
    }
}

module.exports = {CScreening, ChildFollowUp, CDateByYear};