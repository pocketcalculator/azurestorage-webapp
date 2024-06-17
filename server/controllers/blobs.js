import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.STORAGEACCOUNTNAME}.blob.core.windows.net`,
    defaultAzureCredential
);

async function listBlobsFromAzure(containerName) {
    let blobs = [];
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const containerBlobs = containerClient.listBlobsFlat();
    for await (const containerBlob of containerBlobs) {
        blobs.push({
            "etag": containerBlob.properties.etag,
            "name": containerBlob.name,
            "createdOn": containerBlob.properties.createdOn,
            "contentLength": containerBlob.properties.contentLength,
            "contentType": containerBlob.properties.contentType
        });
    }
    return blobs;
};

async function uploadBlobToAzure(containerName, targetBlobName, blob) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(targetBlobName);
    await blockBlobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: blob.type } });
};

async function deleteBlobFromAzure(containerName, targetBlobName) {
    const options = {
        deleteSnapshots: 'include'
    }
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(targetBlobName);
    await blockBlobClient.delete(options);
};

export const listFiles = async (req, res) => {
    const containerName = req.params.name;
    try {
        const containerBlobs = await listBlobsFromAzure(containerName);
        // Sending a JSON response indicating success
        res.json({
            success: true,
            message: `Blobs retrieved successfully from ${containerName}.`,
            data: containerBlobs
        });
    } catch (error) {
        // Sending a JSON response indicating failure
        res.status(500).json({
            success: false,
            message: `Error retrieving blobs from ${containerName}: ${error.message}`
        });
    }
};

export const uploadFile = async (req, res) => {
    console.log(req)
    const container = req.body.container;
    const targetBlobName = req.body.targetFileName;
    const blob = req.body.file;
    try {
        await uploadBlobToAzure(container, targetBlobName, blob);
        // Sending a JSON response indicating success
        res.status(200).json({
            success: true,
            message: `${targetBlobName} uploaded successfully.`
        });
    } catch (error) {
        console.error("Error uploading file:", error.stack); // Log the error stack for detailed debugging information
        // Sending a JSON response indicating failure with more detailed error information
        res.status(500).json({
            success: false,
            message: `Error uploading ${targetBlobName}: ${error.message}`,
            error: {
                message: error.message,
                stack: error.stack // Include the error stack in the response for detailed debugging (consider the security implications)
            }
        });
    }
};

export const deleteFile = (req, res) => {
    const container = req.body.container;
    const targetBlobName = req.body.targetBlobName;
    deleteBlobFromAzure(container, targetBlobName);
    res.send(`${targetBlobName} deleted.`);
}