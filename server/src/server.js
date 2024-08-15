
const { app } = require("./app");
const { connectDB } = require("./config/db");
const { logger } = require("./controller/loggerController");
const { serverPort } = require("./secret");

app.listen(serverPort,async function(){
    logger.log("info","Server running on port http://localhost:8000");
    await connectDB();
})
