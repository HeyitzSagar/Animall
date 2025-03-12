const express = require('express')
const app = express()
const dotenv = require('dotenv');
const router = require('./routes/api.routes')
dotenv.config();
const connectDB = require('./db/db')
const port = process.env.PORT

connectDB();
app.use(express.json());

app.use('/v1/api', router);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))