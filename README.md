
# RemixGPT Grant Application Portal

This project consists of two main parts:

1. **API Server**: Written in NodeJS, Express, and Azure JavaScript SDK libraries to handle CosmosDB interaction and Azure Blob Storage container and file management.
2. **Web Front End**: Provides an end user with a web interface to add and manage grant application projects for RemixGPT.  Written in React/Vite, TypeScript, and Tailwind.

## API Server

The API server requires successful authentication to Microsoft Entra ID. For more information, refer to the [DefaultAzureCredential Class](https://learn.microsoft.com/en-us/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest) from the Azure Identity library.

### Azure SDKs

- [Azure CosmosDB SDK](https://learn.microsoft.com/en-us/javascript/api/overview/azure/cosmos-readme?view=azure-node-latest)
- [Azure Blob Storage SDK](https://learn.microsoft.com/en-us/javascript/api/overview/azure/storage-blob-readme?view=azure-node-latest)

### Starting the API Server

To run the application locally, navigate to the server directory and start the API daemon:

   ```bash
   cd server
   npm start
   ```

The daemon listens on port 5000.

## React/Vite Web Front End

The web front end requires the API to be running.  Once the API server is up, you can start the front end.

### Starting the Front End

Navigate to the top directory and start the React/Vite app:

   ```bash
   cd ..
   npm run dev
   ```

The front end will start and listen on port 5173, navigate to [http://localhost:5173](http://localhost:5173)

To prepare the React/Vite web app for production, you can refer to [https://vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy).

Host the web front end and API for production using [Azure Static Web Apps and Azure App Service](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-app-service).
