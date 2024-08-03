
const { app } = require("./app");
const { serverPort } = require("./secret");


app.listen(serverPort,function(){
    console.log("Server running on port http://localhost:8000");
    
})