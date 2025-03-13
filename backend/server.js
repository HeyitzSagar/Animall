const express = require('express')
const app = express()
const dotenv = require('dotenv');
const router = require('./routes/api.routes')
const cors = require('cors');
dotenv.config();
const connectDB = require('./db/db')
const port = process.env.PORT

connectDB();
// lets treat it to allow request from any where or origin

app.use(cors());
 // middleware to parse JSON request bodies
 app.use(express.urlencoded({ extended: true }));
 // parse application/json
 
app.use(express.json());

app.use('/v1/api', router);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))