const express = require('express');
const cors = require('cors');
const connection = require('./src/config/db')
const PORT = 5000;
const app = express();
const productRouter = require('./src/routes/product.route');


app.use(cors());
app.use(express.json());
app.use(productRouter);


const start = async () => {
    await connection();
    console.log("connected to mongoDB");
    app.listen(PORT, ()=>{
        console.log(`Listening at ${PORT}`);
    })
}

module.exports = start