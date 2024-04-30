const express = require("express"); 
const bodyParser = require("body-parser");
const authentication = require("./routes/authentication") 
require("dotenv").config(); 
let port = process.env.PORT || 3001;


const app = express();
app.use(bodyParser.json()); 

app.use("/api", authentication)

app.listen(port, () => {
    console.log(`Servern är startad på port: ${port}`)
}); 
