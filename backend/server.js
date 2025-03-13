const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv');
const router = require('./routes/api.routes')
const cors = require('cors');
dotenv.config();
const connectDB = require('./db/db')
const port = process.env.PORT

connectDB();
// lets treat it to allow request from any where or origin

// const __dirname = path.resolve();

app.use(cors());
 // middleware to parse JSON request bodies
 app.use(express.urlencoded({ extended: true }));
 // parse application/json
 
app.use(express.json());

app.use('/v1/api', router);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))