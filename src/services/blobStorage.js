const { BlobServiceClient } = require('@azure/storage-blob');
const path = require("path");
const fs = require('fs');
const config = require('../config/config');

async function saveFileIntoBlobStorage(fileName) {
    const localFilePath = path.resolve(`./${fileName}`);
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(config.azureStorageConnectionString);
        const containerClient = blobServiceClient.getContainerClient(config.containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(path.basename(localFilePath));
        const fileContent = fs.readFileSync(localFilePath);

        console.log(`Uploading ${fileName} to container ${config.containerName}...`);
        const uploadBlobResponse = await blockBlobClient.upload(fileContent, fileContent.length);
        console.log('Blob upload successful.', uploadBlobResponse.requestId);

        return uploadBlobResponse;
    } catch (error) {
        console.error("Error uploading file to blob storage", error);
        throw error;
    }
}

module.exports = { saveFileIntoBlobStorage };
