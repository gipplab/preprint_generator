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
                        author VARCHAR(1000),
                        url VARCHAR(100),
                        doi VARCHAR(100),
                        year VARCHAR(100),
                        keywords VARCHAR(100) ARRAY,
                        PRIMARY KEY (title)
                        );`

pool.query(createTableQuery).then(result => {
    if (result) {
        console.log('Table created');
    }
});

function insertPreprint(title, author, url, year, doi, keywords) {
    pool.query(`INSERT INTO preprints (title, author,url, doi, year, keywords) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (title) DO UPDATE SET doi = EXCLUDED.doi, author = EXCLUDED.author, url = EXCLUDED.url, year = EXCLUDED.year, keywords = EXCLUDED.keywords;`, [title, author, url, doi, year, keywords])
}

async function getSimilarPreprints(keywords) {
    function comparePreprints(obj1, obj2) {
        return obj1.title === obj2.title && obj1.doi === obj2.doi;
    }

    const similarPreprints = []
    for (const keyword of keywords) {
        const res = await pool.query(`Select * from preprints where ($1) = ANY(keywords);`, [keyword])
        res.rows.forEach(row => similarPreprints.push(row))
    }
    return similarPreprints.filter(function (obj, index, self) {
        return self.findIndex(function (o) {
            return comparePreprints(o, obj);
        }) === index;
    })
}

exports.insertPreprint = insertPreprint
exports.getSimilarPreprints = getSimilarPreprints