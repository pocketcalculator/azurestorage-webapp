import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

const defaultAzureCredential = new DefaultAzureCredential();

// reference .env to retrieve the STORAGEACCOUNTNAME
dotenv.config();

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.STORAGEACCOUNTNAME}.blob.core.windows.net`,
  defaultAzureCredential
);

async function getBlobContainersfromAzure() {
    let blobContainers = [];
    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      blobContainers.push({"name": container.name});
    }
    return blobContainers;
};

async function createBlobContainerinAzure(containerName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = await containerClient.create();
};

async function deleteBlobContainerinAzure(containerName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const deleteContainerResponse = await containerClient.delete();
};

export const getBlobContainers = async(req, res) => {
    const containers = await getBlobContainersfromAzure();
    res.send(containers);
};

export const createBlobContainer = (req, res) => {
    const container = req.body;
    createBlobContainerinAzure(container.name);
    res.send(`Blob container ${container.name} created.`);
};

export const deleteBlobContainer = (req, res) => {
  const container = req.body;
  deleteBlobContainerinAzure(container.name);
  res.send(`Blob container ${container.name} deleted.`);
};
