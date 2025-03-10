const sql = require('mssql');

const config = {
    server: 'CLS-PAE-FP51764',
    database: 'CASI_GM_AFG',
    user: 'sa',
    password: 'sa',
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        encrypt: true,
    },
    port: 1433,
};

let pool = null;

async function connect() {
    try {
        if (!pool) {
            pool = await new sql.ConnectionPool(config).connect();
            console.log('Connected to SQL Server');
        }
        return pool;
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        throw error;
    }
}

async function executeQuery(query, params = []) {
    try {
        const pool = await connect();
        const request = pool.request();

        // Add parameters if any
        if (params && params.length > 0) {
            params.forEach((param, index) => {
                request.input(`param${index}`, param.value);
            });
        }

        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

module.exports = {
    connect,
    sql,
    executeQuery
};