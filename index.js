const express = require('express');
const connectToMongo = require('./connection');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());

const urlRoutes = require('./routes/url.routes');

const PORT = 8000;

app.use('/url' , urlRoutes);

connectToMongo(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB connected successfully");
})

app.listen(PORT , ()=>{
    console.log(`Server listening on ${PORT}`);
});