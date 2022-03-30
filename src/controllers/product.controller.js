const res = require('express/lib/response');
const client = require('../config/redis');
const productModel = require('../models/product.model');


const getHello = (req,res) => {
    res.status(200).json("Welcome to Redis Assignment");
}

// const getAllProducts = async (req,res)=>{
//     const page = Number(req.query.page) || 1;
//     const per_page = Number(req.query.per_page) || 2;
//     const offset = ( page - 1 ) * per_page;
//     const allProducts = await productModel.find({}).skip(offset).limit(per_page);
//     if(!allProducts) return res.status(401).json({messege:"Something is fishy"});
    
    
//     const totalPages = Math.ceil( await productModel.find({}).countDocuments() / per_page);
//     res.status(200).json({data: allProducts, totalPages});
// }

const getAllProducts = async (req,res) => {
    //Check If data is in redis
    client.get("products", async(err,products) => {
        if(err) 
            return res.status(404).json({messege:err});
            //then Serve that data
            if(products) 
            return res.status(200).json({data: JSON.parse(products)});
            try{
            //If not fetch the data from database
            const products = await productModel.find({}).lean().exec();
    
            //set that data in redis
            client.set("products",JSON.stringify(products));
            
            // finally serve that data
            res.status(201).json({data:products})
        }
        catch(err){
            res.status(404).json({messege:err});
        }
    })
}

const getProductById = async (req,res) => {
    client.get(`${req.params.id}`, async (err,product) => {
        if(err)
            return res.status(404).json({messege:err});
        if(product)
            return res.status(200).json({singleProduct:JSON.parse(product)});
            
        try{
            const singleProduct = await productModel.find({_id:req.params.id});

            client.set(`${req.params.id}`, JSON.stringify(singleProduct));

            res.status(201).json({fromDB:singleProduct})
        }
        catch(err){
            return res.status(404).json({messege:err});

        }
    })
}


const deleteProductById = (req,res) => {
    client.get(`${req.params.id}`, async (err,product) => {
        if(err)
            return res.status(404).json({messege:err});
            if(product){
                client.del(`${req.params.id}`, (err,response)=>{
                if(err)
                    return res.status(400).json({messege:err});
                if(response === 1){
                    console.log(`${req.params.id} deleted successfully`)
                }
            })
        }
        try{
            const respon = await productModel.findOneAndDelete({id:`${req.params.id}`});
            console.log('respon: ', respon);
            res.status(201).json({deletedProd:respon})
        }
        catch(err){
            return res.status(404).json({messegeFrom:err});

        }
    })
}


module.exports = {getAllProducts,getHello,getProductById,deleteProductById}