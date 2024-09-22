import express from "express";

// Models
import { getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts)
router.post("/", addProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct) 

export { router as ProductRoute } 