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
        console.log('Preprint fetched:', preprint);

        if (!preprint) {
            return res.status(404).send('Preprint not found');
        }

        console.log('Fetching PDF from:', preprint.path);
        const pdfFile = fs.readFileSync(preprint.path);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + (preprint.title || id) + '.pdf"');

        res.send(pdfFile);
    } catch (error) {
        console.error('Error in fetching preprint:', error);
        res.status(500).send('Couldn\'t find the requested file!');
    }
});

router.get('/preprint/info/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const preprintInfo = await getPreprint(title);
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
