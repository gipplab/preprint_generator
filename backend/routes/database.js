var express = require('express');
var router = express.Router();
var {insertPreprint, getSimilarPreprints} = require("../database/database")

router.put("/storePreprint", function (req, res, next) {
    insertPreprint(req.query.title, req.query.author, req.query.url, req.query.year, req.query.doi, JSON.parse(req.query.keywords).map((keyword) => keyword.toLowerCase()));
    res.send(req.query);
});

router.get('/getRelatedPreprints', async function (req, res, next) {
    res.send(JSON.stringify(await getSimilarPreprints(JSON.parse(req.query.keywords).map((keyword) => keyword.toLowerCase()))));
});

module.exports = router;