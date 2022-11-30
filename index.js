const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g2haa0r.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('eleven-server').collection('services');
        const reviewCollection = client.db('eleven-server').collection('review');

        app.get('/services', async (req, res) => {
            const query = {};
            const option = await serviceCollection.find(query).toArray();
            res.send(option);
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query);
            res.send(service)
        })

        app.post('/review', async(req, res) => {
            const user = req.body;
            const result = await reviewCollection.insertOne(user);
            res.send(result)
        })

        app.get('/review', async(req, res) => {
            const query = {};
            const product = await reviewCollection.find(query).toArray();
            res.send(product);
        })
    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('eleven project running')
})

app.listen(port, () => console.log(`elven running on ${port}`))