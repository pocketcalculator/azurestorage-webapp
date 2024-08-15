import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";

import blobContainerRoutes from './routes/blobContainer.js';
import blobRoutes from './routes/blobs.js';
import grantProjectRoutes from './routes/grantProjects.js';

// retrieve COSMOSDB_USER, COSMOSDB_PASSWORD, COSMOSDB_HOST, COSMOSDB_PORT from .env
dotenv.config();

const mongoURI = "mongodb://"+process.env.COSMOSDB_USER+":"+process.env.COSMOSDB_PASSWORD+"@"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000"
//const mongoURI = "mongodb://localhost/grantprojects"

const connectToCosmosDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI) , {
            auth: {
                username: process.env.COSMOSDB_USER,
                password: process.env.COSMOSDB_PASSWORD
            },
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false,
            maxIdleTimeMS: 120000
        };
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

app.get('/', (req, res) => {res.send('Welcome to the Grant Projects API!')});

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));