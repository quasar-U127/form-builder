const cors = require("cors");
const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes")
// Connect to MongoDB database
mongoose
    .connect("mongodb://localhost:27017/sources", { useNewUrlParser: true })
    .then(() => {
        const app = express()
        app.use(cors());
        app.use(express.json())
        app.use("/api", routes)

        app.listen(5000, () => {
            console.log("Server has started!")
        })
    })

console.log("Server has started!")