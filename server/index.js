import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";

import blobContainerRoutes from './routes/blobContainer.js';
import blobRoutes from './routes/blobs.js';
import grantProjectRoutes from './routes/grantProjects.js';

dotenv.config();

//const mongoURI = "mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&retrywrites=false&maxIdleTimeMS=120000&replicaSet=globaldb";
const mongoURI = "mongodb://localhost/grantprojects"

const connectToCosmosDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI) , {
        /*
            auth: {
                username: process.env.COSMOSDB_USER,
                password: process.env.COSMOSDB_PASSWORD
            },
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false,
            maxIdleTimeMS: 120000
        */
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

app.get('/', (req, res) => {res.send('Hello from Homepage')});

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));