import { create } from 'zustand'
import axios from 'axios'

// Retrieve the API URL from environment variables
const apiUrl = import.meta.env.VITE_API_URL; 

// Log the API URL to the console
console.log('API URL VIA IMPORT:', apiUrl);

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
         if(!newProduct.name || !newProduct.image || !newProduct.price) {
             return {
                sucess: false,
                message: "All fields are required!"
             }
         }
         
         const res = await axios.post('https://product-crud-mern.onrender.com/api/products', newProduct)

         set(state => ({
            products: [...state.products, res.data]
         }))
         
         return {
            success: true,
            message: "Product created successfully",
         }
    },
    fetchProducts: async () => {
        const res = await axios.get('https://product-crud-mern.onrender.com/api/products')
        
        set(state => ({
            products: res.data.data
        }))
    },
    deleteProduct: async (pid) => {
        const res = await axios.delete(`https://product-crud-mern.onrender.com/api/products/${pid}`)
        if (!res.data.success) {
            return { 
                success: false, 
                message: res.data.message
            }
        };

        // update the ui immediately, without needing a refresh
        set(state => ({
            products: state.products.filter(product => product._id !== pid)
        }))

        return { 
            success: true, 
            message: res.data.message
        }
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await axios.put(`https://product-crud-mern.onrender.com/api/products/${pid}`, updatedProduct)

        if (!res.data.success) {
            return { 
                success: false, 
                message: res.data.message
            }
        };

        // update the ui immediately, without needing a refresh
        set(state => ({
            products: state.products.map(product => product._id === pid ? updatedProduct : product)
        }))

        return { 
            success: true, 
            message: res.data.message
        }
    }

}))