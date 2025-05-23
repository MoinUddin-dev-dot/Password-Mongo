const express = require('express')
const bodyParser = require('body-parser')

const { MongoClient } = require('mongodb');
var cors = require('cors')

 

require('dotenv').config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'pass-op';

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())

app.get('/passwords/count', async (req, res) => {
    await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('passwords'); 
  const findResult = await collection.find({}).toArray()
  res.send(findResult)
})

app.post('/passwords', async (req,res)=> {
    const password =  req.body
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password)
    res.send({
        succes: true,
        result: findResult
    })
})

app.delete('/passwords/:id', async (req,res)=> {
    const password =  req.params.id;
    console.log(password)
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne({id: password})
    res.send({
        succes: true,
        "delete": true
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   