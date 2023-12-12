require("dotenv").config();
require("express-async-errors");

// cors
// const corsMiddleware = require("./cors");

// express
const express = require("express");
const app = express();

// app.use(corsMiddleware);

// rest of the packages
const morgan = require("morgan");

// database
// const connectDB = require("./db/connect.js");

// routers
// const authRouter = require("./routes/authRoutes");

app.use(morgan("tiny"));
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Testing...")
})

const port = process.env.PORT || 5000

const start = async ()=>{
    try {
        // await connectDB(process.env.MONGO_URL);
    // server.listen(port, console.log(`Server is listening on port ${port}...`));
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();