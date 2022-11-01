const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
app.use(cors());
app.use(express.json());
const port = (process.env.PORT || 5000);
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






app.listen(port, () => {
    console.log(`server port ${port}`);
});
