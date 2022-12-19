var express = require('express');
var router = express.Router();


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require('fs');

const credentials = './src/X509-cert-4164365175652944826.pem'

const client = new MongoClient('mongodb+srv://judge-dredd.53wwue5.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});
// middleware that is specific to this router
router.use(async (req, res, next) =>{
  console.log('Time: ', Date.now());
  next();
});


router.get('/', async (req, res)=> {
  try {
    await client.connect();
    const database = client.db("judge-dredd-course");
    const collection = database.collection("course");
    const docs = await collection.find({});

    const result=[]
    await docs.forEach(element=>{result.push(element)});
    // perform actions using client
    res.send(JSON.stringify(result));

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});
router.get('/:id', async (req, res)=> {
  try {

    await client.connect();
    const database = client.db("judge-dredd-course");
    const collection = database.collection("course");
    const doc = await collection.findOne({_id:ObjectId(req.params.id)});

    // perform actions using client
    res.send(JSON.stringify(doc));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

router.post('/', async (req, res) =>{
  const payload = JSON.stringify(req.body)
  
  try {

    await client.connect();
    const database = client.db("judge-dredd-course");
    const collection = database.collection("course");
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    };
    console.log(req.body,doc,payload)
    const result = await collection.insertOne(req.body);

    console.log(result);
    // perform actions using client
    res.send(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  // res.send('Got a POST request');
});




router.put('/:id', async (req, res) =>{
   
  try {
    let payload = req.body
    payload['_id']=new ObjectId( req.params.id)
    await client.connect();
    const database = client.db("judge-dredd-course");
    const collection = database.collection("course");
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {$set: payload},
      { upsert: true }
    );

    console.log(result);
    // perform actions using client
    res.send(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});



router.delete('/:id', async (req, res) =>{
   
  try {
    let payload = req.body
    payload['_id']=new ObjectId( req.params.id)
    await client.connect();
    const database = client.db("judge-dredd-course");
    const collection = database.collection("course");
    const result = await collection.deleteOne(
      { _id: new ObjectId(req.params.id) }
    );

    console.log(result);
    // perform actions using client
    res.send(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

module.exports = router;


