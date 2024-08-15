import mongoose from 'mongoose';
import dotenv from "dotenv";

// reference .env to retrieve the COSMOSDB_DBNAME, COSMOSDB_KEY, COSMOSDB_PORT
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