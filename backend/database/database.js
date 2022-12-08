const {Pool} = require('pg')
const credentials = require("../config.json")

const pool = new Pool({
    user: credentials.database_user,
    host: credentials.database_host,
    database: credentials.database_name,
    password: credentials.database_password,
    port: credentials.database_port,
})

const createTableQuery = `CREATE TABLE IF NOT EXISTS preprints (
                        title VARCHAR(1000),
                        doi VARCHAR(100),
                        keywords VARCHAR(100) ARRAY,
                        PRIMARY KEY (title)
                        );`

pool.query(createTableQuery).then(result => {
    if (result) {
        console.log('Table created');
    }
});

async function insertPreprint(title, doi, keywords) {
    await pool.query(`INSERT INTO preprints (title, doi, keywords) VALUES ($1, $2, $3) ON CONFLICT (title) DO UPDATE SET doi = EXCLUDED.doi, keywords = EXCLUDED.keywords;`, [title, doi, keywords])
}

async function getSimilarPreprints(keywords) {
    const similarPreprints = new Set()
    for (const keyword of keywords) {
        const res = await pool.query(`Select * from preprints where ($1) = ANY(keywords);`, [keyword])
        res.rows.forEach(row => similarPreprints.add(row))
    }
    return Array.from(similarPreprints)

}

exports.insertPreprint = insertPreprint
exports.getSimilarPreprints = getSimilarPreprints