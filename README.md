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

Issues are fixable by the following command line:

npm audit fix


### How to commence backend startup.
------------------------------------------------------
- Create an api key via Trafikverkt(https://api.trafikinfo.trafikverket.se/)



### step by step
------------------------------------------------------
- First we installed sqlite.
- We create a API key.
- We create a file ".env" and we put the API key in it.
- To start the backend write npm start. Port 1337