import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

// reference .env to retrieve the STORAGEACCOUNTNAME
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

async function uploadBlobToAzure(containerName, targetBlobName, localBlobFilePath) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(targetBlobName);
    await blockBlobClient.uploadFile(localBlobFilePath);
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

export const uploadFile = async (file, targetBlobName, containerName) => {
    const localBlobFilePath = file.path;
    try {
        await uploadBlobToAzure(containerName, targetBlobName, localBlobFilePath);
        return { success: true, message: `${targetBlobName} Upload successful.` };
    } catch (error) {
        throw error;
    }
};

export const deleteFile = async (req, res) => {
    const container = req.body.container;
    const targetBlobName = req.body.targetBlobName;
    try {
        await deleteBlobFromAzure(container, targetBlobName);
        res.send(`${targetBlobName} deleted.`);
    } catch (error) {
        // Sending a JSON response indicating failure
        res.status(500).json({
            success: false,
            message: `Error deleting ${targetBlobName} from ${container}: ${error.message}`
        });
    }
}