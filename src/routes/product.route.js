const express = require("express");
const { getHello, getAllProducts, getProductById, deleteProductById } = require("../controllers/product.controller");

const router = express.Router();

router.get("/",getHello);
router.get("/products", getAllProducts);
router.get("/products/:id",getProductById);
router.delete("/products/:id",deleteProductById)

module.exports = router;

