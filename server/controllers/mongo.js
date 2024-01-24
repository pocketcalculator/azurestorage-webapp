import mongoose from 'mongoose';
import dotenv from "dotenv";

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