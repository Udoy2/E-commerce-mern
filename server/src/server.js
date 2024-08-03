
const { app } = require("./app");
const { connectDB } = require("./config/db");
const { serverPort } = require("./secret");

app.listen(serverPort,async function(){
    console.log("Server running on port http://localhost:8000");
    await connectDB();
})
