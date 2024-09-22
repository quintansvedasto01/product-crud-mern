import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.error("Error: ", error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addProduct = async (req, res) => {
    const product = req.body; // retrieve data provided by the client

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: newProduct
        })
    } catch (error) {
        console.error("Error: ", error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body; // retrieve data provided by the client

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            success: false,
            message: "Invalid Product ID"
        })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })

        res.status(201).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct
        })
    } catch (error) {
        console.error("Error: ", error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            success: false,
            message: "Invalid Product ID"
        })
    }

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.error("Error: ", error.message)
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
} 
