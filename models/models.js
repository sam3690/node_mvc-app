const { executeQuery } = require('../config/db');

class CScreening {
    static async getTop10() {
        const query = `SELECT TOP 10 col_id, cs06, cs08, cs12, cs1502, uc, village FROM [dbo].[CScreening]`;
        return await executeQuery(query);
    }
}

class ChildFollowUp {
    static async getData() {
        const query = `SELECT TOP 10 col_id,district, endingdatetime, fc08, fc15, fc16 FROM [dbo].[CFollowup]`;
        return await executeQuery(query);
    }
}

module.exports = {CScreening, ChildFollowUp};