const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer'); // Import multer
const xml2js = require('xml2js');
const router = express.Router();

// Set up multer to parse form-data requests. This configuration doesn't store files to disk.
const upload = multer({ storage: multer.memoryStorage() });

// Change from router.get to router.post and use the upload middleware to handle the file upload.
router.post("/", upload.single('file'), async (req, res) => {
    // Ensure a file is actually provided
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Create a new FormData instance and append the uploaded file
    const formData = new FormData();
    formData.append('input', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        knownLength: req.file.size,
    });

    try {
        // Adjust the URL if necessary for your GROBID server
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

            // `result` is a JavaScript object. Send it back as JSON.
            res.json(result);
        });

    } catch (error) {
        console.error('Error when calling GROBID: ', error);
        res.status(500).send('Error when processing the PDF file');
    }
});

module.exports = router;