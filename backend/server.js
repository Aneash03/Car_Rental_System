const express = require("express")
const app = express()
const dotenv = require('dotenv')
const { connectDB } = require('./config/db.js')
const path = require("path")
const carRoutes = require('./routes/car.routes.js')
const cors = require("cors")


dotenv.config()
const PORT  = process.env.PORT

app.use(cors({
    origin:"*"
}))



app.use(express.json())

app.use('/api/cars', carRoutes )

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
    
})
