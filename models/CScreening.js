const { executeQuery } = require('../config/db');

class CScreening {
    static async getTop10() {
        const query = `SELECT TOP 10 col_id, _id, cs06, cs12, cs1502, uc, village FROM [dbo].[CScreening]`;
        return await executeQuery(query);
    }
}

module.exports = CScreening;