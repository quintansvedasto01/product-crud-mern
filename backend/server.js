import cors from 'cors'
import express from 'express' //package.json type: module
import dotenv from 'dotenv'
import path from 'path'
// Database Connection
import { connectDB } from './config/db.js'
// Route import
import { ProductRoute } from "./routes/product.route.js";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

// CORS Policy (Allow all origins)
app.use(cors());    

// For deployment (root directory)
const __dirname = path.resolve()

// Middleware (allows us to use/accept JSON data in body)
app.use(express.json()) 

// Routes
app.use('/api/products', ProductRoute)

// For deployment
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    // Serve index.html for all other requests
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

// Server
app.listen(PORT, () => {
    connectDB()
    console.log('listening on http://localhost:' + PORT)    
})