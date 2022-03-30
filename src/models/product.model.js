const mongoose  = require("mongoose");

const ProductSchema = new mongoose.Schema({
    // id:{type:Number, required: true},
    name:{type:String, required:true},
    price:{type:String, required:true}
});

const Product = mongoose.model("Product",ProductSchema);

module.exports = Product