import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.STORAGEACCOUNTNAME}.blob.core.windows.net`,
    defaultAzureCredential
);

async function getBlobsfromAzure(containerName) {
    let blobs = [];
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const containerBlobs = containerClient.listBlobsFlat();
    for await (const containerBlob of containerBlobs) {
        blobs.push({
            "name": containerBlob.name,
            "createdOn": containerBlob.properties.createdOn,
            "contentLength": containerBlob.properties.contentLength,
            "contentType": containerBlob.properties.contentType
        });
    }
    return blobs;
};

async function uploadBlobFromLocalPath(containerName, targetBlobName, localBlobFilePath) {
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

export const getBlobs = async (req, res) => {
    console.log(req.params.name)
    const containerName = req.params.name;
    const containerBlobs = await getBlobsfromAzure(containerName);
    res.send(containerBlobs);
};

export const uploadBlob = (req, res) => {
    const container = req.body.container;
    const targetBlobName = req.body.targetBlobName;
    const localBlobFilePath = req.body.localBlobFilePath;
    uploadBlobFromLocalPath(container, targetBlobName, localBlobFilePath);
    res.send(`${targetBlobName} uploaded.`);
};

export const deleteBlob = (req, res) => {
    const container = req.body.container;
    const targetBlobName = req.body.targetBlobName;
    deleteBlobFromAzure(container, targetBlobName);
    res.send(`${targetBlobName} deleted.`);
}