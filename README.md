[![Node.js CI](https://github.com/KhalidS3/jsramverk-backend/actions/workflows/nodejs.yml/badge.svg)](https://github.com/KhalidS3/jsramverk-backend/actions/workflows/nodejs.yml)

### Jsramverk-backend
---------------------------

### Vulnerabilities found
----------------------------------
| Vulnerability | Description                                     | Severity  |
|-------------- | ------------------------------------------------|-----------|
| debug         | Inefficient Regular Expression Complexity       | high      |
|               | vulnerability                                   |           |
| fresh         | Regular Expression Denial of Service in fresh   | high      |
| mime          | Regular Expression Denial of Service when mime  | moderate  |
|               | lookup performed on untrusted user input        |           |
| ms            | Vercel ms Inefficient Regular Expression        | moderate  |
|               | Complexity vulnerability                        |           |
| node-fetch    | node-fetch is vulnerable to Exposure of         | high      |
|               | Sensitive Information to an Unauthorized Actor  |           |
| qs            | Prototype Pollution Protection Bypass in qs     | high      |
| semver        | vulnerable to Regular Expression Denial of      | moderate  |
|               | Service                                         |           |

- **Issues are fixable by the following command line:**
   ```bash
    npm audit fix

# Backend Startup Guide

Follow these steps to commence your backend startup:

1. **Create an API Key via Trafikverket:**
   To interact with the Trafikverket API, you need an API key. Obtain one by visiting [Trafikverket API Key Registration](https://api.trafikinfo.trafikverket.se/).

2. **Install Necessary Packages:**
   Run the following command to install the necessary packages needed for the backend:

   ```bash
   npm install

3. **Reset the Database:**
   Use the reset_db.bash script to reset the database to its initial state. This step ensures your backend operates with a clean slate.

   ```bash
   ./reset_db.bash

4. **Create an Environment (.env) File:**
   Store your Trafikverket API key securely in an .env file. This file will contain sensitive information, so make sure to keep it safe.

    ```env
    TRAFIKVERKET_API_KEY=your_api_key_here

5. **Start the Backend:**
   To initiate the backend, execute the following command:

    ```bash
    npm start

5. **Port Configuration:**
   The backend will run on port 1337

