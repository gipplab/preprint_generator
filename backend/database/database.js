const {Pool} = require('pg')
const credentials = require("../config.json")

const pool = new Pool({
    user: credentials.database_user,
    host: credentials.database_host,
    database: credentials.database_name,
    password: credentials.database_password,
    port: credentials.database_port,
})

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS preprints (
        id VARCHAR(1000),
        title VARCHAR(1000),
        author VARCHAR(1000),
        url VARCHAR(100),
        doi VARCHAR(100),
        year VARCHAR(100),
        path VARCHAR(1000),
        annotation VARCHAR(10000),
        keywords VARCHAR(100) ARRAY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );`;

pool.query(createTableQuery).then(result => {
    if (result) {
        console.log('Table created');
    }
});

function insertPreprint(id, title, author, url, year, doi, annotation, keywords, path) {
    pool.query(`INSERT INTO preprints (id, title, author, url, doi, year, path, annotation,keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [id, title, author, url, doi, year, path, annotation, keywords]);
}


async function getSimilarPreprints(keywords) {
    function comparePreprints(obj1, obj2) {
        return obj1.title === obj2.title && obj1.doi === obj2.doi;
    }

    const similarPreprints = [];

    for (const keyword of keywords) {
        const res = await pool.query(`
            SELECT p.*
            FROM preprints p
            INNER JOIN (
                SELECT title, MAX(created_at) AS max_created_at
                FROM preprints
                WHERE ($1) = ANY(keywords)
                GROUP BY title
            ) latest
            ON p.title = latest.title AND p.created_at = latest.max_created_at;
        `, [keyword]);

        res.rows.forEach(row => similarPreprints.push(row));
    }

    return similarPreprints.filter(function (obj, index, self) {
        return self.findIndex(function (o) {
            return comparePreprints(o, obj);
        }) === index;
    })
}

async function getPreprint(id) {
    const result = await pool.query(`SELECT * FROM preprints WHERE id = $1`, [id]);
    return result.rows[0];
}

exports.getPreprint = getPreprint
exports.insertPreprint = insertPreprint
exports.getSimilarPreprints = getSimilarPreprints