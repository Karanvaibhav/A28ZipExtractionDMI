const axios = require('axios');
const AdmZip = require('adm-zip');

async function handleExtraction(req, res) {
    const { zipUrl, password } = req.body;

    try {
        // Download the zip file
        const response = await axios.get(zipUrl, { responseType: 'arraybuffer' });
        const zipData = response.data;

        // Extract the zip file
        const zip = new AdmZip(zipData);

        // Try to decrypt the zip file with the provided password and store it on a local system
        // try {
        //     await zip.extractAllTo("./temp", true, password);
        // } catch (error) {
        //     console.error("Error decrypting zip file:", error);
        //     return res.status(400).send("Invalid password or encrypted zip file");
        // }

        const zipEntries = zip.getEntries();
        const csvFileEntry = zipEntries.find(entry => entry.entryName.endsWith('.csv'));
        const csvData = csvFileEntry.getData(password);
        console.log('CSV file Entries: ' + csvData);

        csvDataAsString = csvData.toString();
        const rows = csvDataAsString.split('\n');

        //parsing CSV to JSON
        const header = rows[0].split(',');
        const jsonData = [];
        for (let i = 1; i < rows.length-1; i++) {
            const values = rows[i].split(',');
            const entry = {};
            for (let j = 0; j < header.length; j++) {
                entry[header[j]] = values[j];
            }
            jsonData.push(entry);
        }

        // Log the parsed JSON data
        console.log(jsonData);
        return res.send(jsonData);

    } catch (error) {
        console.error("Error handling extraction:", error);
        return res.status(500).send("Error handling extraction");
    }
}

async function handleHome(req, res) {
    return res.send('Hello world!');
}

module.exports = { handleExtraction, handleHome };