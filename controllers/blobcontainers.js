import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

const defaultAzureCredential = new DefaultAzureCredential();

dotenv.config();

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.STORAGEACCOUNTNAME}.blob.core.windows.net`,
  defaultAzureCredential
);

let blobContainers = [];

async function getBlobContainersfromAzure() {
    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      blobContainers.push({"name": container.name});
    }
    return blobContainers;
};

async function createBlobContainerinAzure(containerName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = await containerClient.create();
  console.log(
    `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
  );
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
