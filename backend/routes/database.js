const express = require('express');
const router = express.Router();
const path = require('path');
const {insertPreprint, getSimilarPreprints} = require("../database/database");
const fs = require('fs');
const {getPreprint} = require("../database/database"); // Assume you have a function to get preprint details


router.put("/storePreprint", async function (req, res, next) {
    const {title, author, url, year, doi, keywords, annotation, file} = req.body;

    // Decode the base64 string and save it as a PDF
    const buffer = Buffer.from(file, 'base64');
    const pdfPath = path.join(__dirname, "..", 'uploads', `${title.replace(/\s+/g, '_')}.pdf`);

    try {
        fs.writeFileSync(pdfPath, buffer);
    } catch (error) {
        return res.status(500).send({error: "Error saving file"});
    }

    // Call insertPreprint with the new filePath argument
    await insertPreprint(title, author, url, year, doi, annotation, keywords.map(keyword => keyword.toLowerCase()), pdfPath);

    res.send({title, author, url, year, doi, annotation, keywords, pdfPath});
});

router.get('/getRelatedPreprints', async function (req, res, next) {
    res.send(JSON.stringify(await getSimilarPreprints(JSON.parse(req.query.keywords).map((keyword) => keyword.toLowerCase()))));
});

module.exports = router;