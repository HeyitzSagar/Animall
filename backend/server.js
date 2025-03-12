const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db/db')
const port = process.env.PORT

connectDB();
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))