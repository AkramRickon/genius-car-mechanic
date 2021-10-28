
const express = require('express');
const { MongoClient } = require("mongodb");
require('dotenv').config()
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kd44i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

// console.log(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('carMechanic');
    const servicesCollection = database.collection('services');

    app.post('/services', async (req, res) => {
      const service=req.body;
      console.log('Post Hited', service);
      const result=await servicesCollection.insertOne(service);
      console.log(result);
      res.json(result);

    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Running Genius Server');
});

app.listen(port, () => {
  console.log('Running Genius Server on port', port);
})