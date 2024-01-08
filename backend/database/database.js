const {Pool} = require('pg')
const credentials = require("../config.json")
// Load wink-nlp package.
const winkNLP = require('wink-nlp');
// Load english language model.
const model = require('wink-eng-lite-web-model');
// Instantiate winkNLP.
const nlp = winkNLP(model);
// Obtain "its" helper to extract item properties.
const its = nlp.its;
// Obtain "as" reducer helper to reduce a collection.
const as = nlp.as;

function lemmatizeKeywords(keywords) {
    return keywords.map((keyword) => {
        const doc = nlp.readDoc(keyword);
        return doc.tokens().out(its.lemma).join(" ");
    });
}

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
    const lemmatizedKeywords = lemmatizeKeywords(keywords);
    pool.query(`INSERT INTO preprints (id, title, author, url, doi, year, path, annotation,keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [id, title, author, url, doi, year, path, annotation, lemmatizedKeywords]);
}


async function getSimilarPreprints(keywords) {
    const lemmatizedKeywords = lemmatizeKeywords(keywords);

    const query = `
        SELECT DISTINCT ON (p.title, p.doi) p.*
        FROM preprints p
        INNER JOIN (
            SELECT title, MAX(created_at) AS max_created_at
            FROM preprints
            WHERE keywords && $1  -- Using array overlap operator
            GROUP BY title
        ) latest
        ON p.title = latest.title AND p.created_at = latest.max_created_at
        ORDER BY p.title, p.doi, p.created_at DESC;
    `;

    // Executing the query with all keywords
    const res = await pool.query(query, [lemmatizedKeywords]);

    return res.rows;
}

async function getPreprint(id) {
    const result = await pool.query(`SELECT * FROM preprints WHERE id = $1`, [id]);
    return result.rows[0];
}

exports.getPreprint = getPreprint
exports.insertPreprint = insertPreprint
exports.getSimilarPreprints = getSimilarPreprints