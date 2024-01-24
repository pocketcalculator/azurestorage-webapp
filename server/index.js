import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";

import blobContainerRoutes from './routes/blobContainer.js';
import blobRoutes from './routes/blobs.js';
import grantProjectRoutes from './routes/grantProjects.js';

dotenv.config();

const mongoURI = `mongodb://${process.env.COSMOSDB_DBNAME}:${process.env.COSMOSDB_KEY}@${process.env.COSMOSDB_DBNAME}.mongo.cosmos.azure.com:${process.env.COSMOSDB_PORT}/?ssl=true`;

const connectToCosmosDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Connected to CosmosDB')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
};

connectToCosmosDB();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/api/blobContainer', blobContainerRoutes);
app.use('/api/blobs', blobRoutes);
app.use('/api/grants', grantProjectRoutes);

app.get('/', (req, res) => {res.send('Hello from Homepage')});

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));