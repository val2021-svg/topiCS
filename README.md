# topiCS

This is the repository for the webapp topiCS of the user interface to access the results of the [topic discovery using LDA](https://github.com/Lucasvitoriano25/TopicDiscovery) on CS 1A and 2A courses catalogs.  

## Setup

To run the project locally, you need to install the run time environment:
- nodejs

After that, in your command prompt, run:

```javascript
npm install mongoose mongodb ejs body-parser express nodemon dotenv
```

## Run the webapp

After installing those packages, run

```javascript
node index.js  
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Observation

The connection string to connect to the mongoDB database that stores the results from the LDA model is defined in the hidden .env file.


