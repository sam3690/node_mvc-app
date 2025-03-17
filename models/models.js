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
                // converting afghan Date of Assesment to Gregorian Format
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


class CDistricts {
    static async getData(){
        const query = "SELECT cs08, district FROM [dbo].[CScreening] where colflag is null";
        const data = await executeQuery(query)              
        
        // Initialize an empty object to store the counts
        const districtCounts = {};

        // Iterate over the data array
        data.forEach(entry => {
        const district = entry.district;
        
        // If the district is already in the object, increment its count
        if (districtCounts[district]) {
            districtCounts[district]++;
        } else {
            // Otherwise, initialize the count for this district to 1
            districtCounts[district] = 1;
        }
        });

        const districtCountsArray = Object.keys(districtCounts).map(district => {
            return {
              district: district,
              count: districtCounts[district]
            };
          });
        return districtCountsArray;
    }
}

class totalSreenings {
    static async getData() {
        const query = "SELECT cs13 FROM [dbo].[CScreening] where cs13 IN (1,2)";
        const data = await executeQuery(query)
        console.log(data);
        
        

       let maleCount = 0
       let femaleCount = 0

       if (data && typeof data === 'object') {
        // Convert the array-like object to an array if needed
        const records = Array.isArray(data) ? data : Object.values(data);
        
        records.forEach(row => {
            if (row && row.cs13 === '1') {
                maleCount++;
            } else if (row && row.cs13 === '2') {
                femaleCount++;   
            }
        });
    }
             

       const totalEntries = maleCount + femaleCount      

       const malePercentage = totalEntries > 0 ? ((maleCount / totalEntries) * 100).toFixed(2) : 0;
       const femalePercentage = totalEntries > 0 ? ((femaleCount / totalEntries) * 100).toFixed(2) : 0;
       
       return{
        maleCount,
        femaleCount,
        totalEntries,
        malePercentage,
        femalePercentage
       }
    }
}

module.exports = {CScreening, ChildFollowUp, CDateByYear, CDistricts, totalSreenings};