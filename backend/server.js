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

app.get('/', async (req, res) => {
    await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('passwords'); 
  const findResult = await collection.find({}).toArray()
  res.send(findResult)
})

app.post('/', async (req,res)=> {
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

app.delete('/', async (req,res)=> {
    const password =  req.body
    console.log(password)
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne(password)
    res.send({
        succes: true,
        "delete": true
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   