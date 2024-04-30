const express = require("express"); 
const bodyParser = require("body-parser"); 
require("dotenv").config(); 
let port = process.env.PORT || 3001;


const app = express();
app.use(bodyParser); 


app.listen(port, () => {
    console.log(`Servern är startad på port: ${port}`)
}); 
