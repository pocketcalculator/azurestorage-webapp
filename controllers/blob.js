import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

const defaultAzureCredential = new DefaultAzureCredential();

dotenv.config();

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.STORAGEACCOUNTNAME}.blob.core.windows.net`,
    defaultAzureCredential
);

async function getBlobsfromAzure(containerName) {
    let blobs = [];
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const containerBlobs = containerClient.listBlobsFlat();
    for await (const containerBlob of containerBlobs) {
        blobs.push({ "name": containerBlob.name });
    }
    return blobs;
};

async function uploadBlobFromLocalPath(containerName, targetBlobName, localBlobFilePath) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(targetBlobName);
    await blockBlobClient.uploadFile(localBlobFilePath);
};

export const getBlobs = async (req, res) => {
    const containerName = req.body;
    const containerBlobs = await getBlobsfromAzure(containerName.container);
    res.send(containerBlobs);
};

export const uploadBlob = (req, res) => {
    console.log(req.body);
    const container = req.body.container;
    const targetBlobName = req.body.targetBlobName;
    const localBlobFilePath = req.body.localBlobFilePath;
    uploadBlobFromLocalPath(container, targetBlobName, localBlobFilePath);
    res.send(`${targetBlobName} uploaded.`);
};