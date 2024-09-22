import { create } from 'zustand'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
         if(!newProduct.name || !newProduct.image || !newProduct.price) {
             return {
                success: false,
                message: "All fields are required!"
             }
         }
         
         const res = await axios.post(`${apiUrl}/api/products`, newProduct)

         set(state => ({
            products: [...state.products, res.data]
         }))
         
         return {
            success: true,
            message: "Product created successfully",
         }
    },
    fetchProducts: async () => {
        const res = await axios.get(`${apiUrl}/api/products`)
        
        set(state => ({
            products: res.data.data
        }))
    },
    deleteProduct: async (pid) => {
        const res = await axios.delete(`${apiUrl}/api/products/${pid}`)
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
        const res = await axios.put(`${apiUrl}/api/products/${pid}`, updatedProduct)

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