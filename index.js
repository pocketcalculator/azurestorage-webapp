import express from 'express';
import bodyParser from 'body-parser';

import userRoutes from './routes/users.js';
import blobContainerRoutes from './routes/blobcontainers.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.use('/blobContainers', blobContainerRoutes);

app.get('/', (req, res) => {res.send('Hello from Homepage')});

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));