require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 15000
    })
    .then(() => {
        console.log("MONGODB CONNECTION SUCCESS");
        process.exit(0);
    })
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED");
        console.log(err.message);
        process.exit(1);
    });