const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('genius car server is running');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zh0amk9.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const serviceCollection = client.db('geniusCar').collection('services');
        const orderCollection = client.db('geniusCar').collection('orders');

        // read all
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        // read for checkout
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        // read for order all
        app.get('/orders', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email,
                };
            }
            console.log(req.query);
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // create
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        // patch
        app.patch('/orders/:id', async (req, res) => {
            const id = req.params.id;
            status = req.body.status;
            const query = { _id: ObjectId(id) };
            updatedDoc = {
                $set: {
                    status: status,
                },
            };
            const result = await orderCollection.updateOne(query, updatedDoc);
            res.send(result);
        });

        // delete
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        });
    } catch (error) {}
}

run().catch((err) => console.error(err));

app.listen(port, () => {
    console.log(`server port ${port}`);
});
