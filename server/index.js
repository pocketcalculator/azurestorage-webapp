import express from 'express';
import bodyParser from 'body-parser';

import blobContainerRoutes from './routes/blobcontainer.js';
import blobRoutes from './routes/blob.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/blobContainer', blobContainerRoutes);
app.use('/blob', blobRoutes);

app.get('/', (req, res) => {res.send('Hello from Homepage')});

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));