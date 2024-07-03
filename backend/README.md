# Backend for CiteAssist

CiteAssist Backend is written in Javascript with Express, a popular Node.js web application framework. This backend provides APIs for the frontend to access the database and generate preprints with related papers and BibTeX annotations.

## Prerequisites

To use CiteAssist, you must have Node version 16.13.0 or higher installed on your machine.

## Getting Started

To get started, clone this repository and navigate to the `backend` directory. Then, run the following command to install the dependencies:

```
npm install
```
To start the backend, run the following command:
```
npm start
```
The backend will start running on port 9000 by default. You can access it by navigating to http://localhost:9000 in your web browser.

Alternatively, you can use PM2 to run the backend as a process in the background. To do this, simply run the following command:

```
pm2 start npm --name citeassist -- start 
```

This will start the backend and run it as a background process.

## Configuration
The backend uses a `config.json` file to store configuration parameters. The following parameters are included in the file:

- `database_user`: The username to use when connecting to the database
- `database_host`: The host name or IP address of the database server
- `database_name`: The name of the database to use
- `database_password`: The password to use when connecting to the database
- `database_port`: The port number to use when connecting to the database
- `cors_url`: The URL of the frontend that is allowed to access the backend via Cross-Origin Resource Sharing (CORS).

## Endpoints

CiteAssist Backend provides the following endpoints:

- ``POST /database/storePreprint``: Store a preprint in the database with its related papers and BibTeX annotation.
- ``GET /database/getRelatedPreprints``: Retrieve related preprints for a given preprint ID from the database.
- ``GET /testAPI``: A simple test endpoint to check that the backend is running.

## Contributing

We welcome contributions to CiteAssist Backend! If you find a bug, have a feature request, or would like to contribute code, please open an issue or pull request on this repository.

## License

This project is licensed under the MIT License. Please refer to the [LICENSE](../COPYING) file for more information.
