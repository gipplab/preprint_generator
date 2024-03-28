const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer'); // Import multer
const xml2js = require('xml2js');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single('file'), async (req, res) => {
    // Ensure a file is actually provided
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const formData = new FormData();
    formData.append('input', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        knownLength: req.file.size,
    });

    try {
        const grobidResponse = await axios.post('http://grobid:8070/api/processFulltextDocument', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            responseType: 'text', // Changed to 'text' to handle XML response correctly
        });

        // Convert XML response to JSON
        xml2js.parseString(grobidResponse.data, (err, result) => {
            if (err) {
                console.error('Error parsing XML: ', err);
                return res.status(500).send('Error parsing XML response');
            }

            res.json(result);
        });

    } catch (error) {
        console.error('Error when calling GROBID: ', error);
        res.status(500).send('Error when processing the PDF file');
    }
});

module.exports = router;