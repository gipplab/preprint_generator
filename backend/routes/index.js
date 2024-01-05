const express = require('express');
const {getPreprint} = require("../database/database");
const fs = require("fs");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/preprint/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const preprint = await getPreprint(id);

        if (!preprint) {
            return res.status(404).send('Preprint not found');
        }

        const pdfFile = fs.readFileSync(preprint.path);

        res.setHeader('Content-Type', 'application/pdf');
        const filename = encodeURIComponent(preprint.title) + '.pdf';
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

        res.send(pdfFile);
    } catch (error) {
        console.error('Error in fetching preprint:', error);
        res.status(500).send('Couldn\'t find the requested file!');
    }
});

router.get('/preprint/info/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const preprintInfo = await getPreprint(id);
        if (!preprintInfo) {
            return res.status(404).send('Preprint information not found');
        }

        res.json(preprintInfo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
