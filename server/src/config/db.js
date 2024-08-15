const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const { logger } = require("../controller/loggerController");
const connectDB = async (options={})=> {
    try {
        await mongoose.connect(mongodbURL,options)
        logger.log("info","Connection to DB is sucessfully established");
        mongoose.connection.on('error',(error)=>{
            logger.log("error",
                "DB connection error: "+error.toString()
            );
            
        })
    } catch (error) {
        logger.log("error",
            "Could not connect to DB: ",error.toString()
        );
    }
}

module.exports = {connectDB}