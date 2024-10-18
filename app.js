const express = require('express');

// Module wise routings here START

const login_routes = require('./routes/login');
const product_routes = require('./routes/products');
const sales_order_routes = require('./routes/sales_order');

// Module wise routings here END
const fs = require('fs');
const bodyParser =  require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use((req,res,next)=>{
   fs.appendFile('log.txt',`\n${Date.now()}: ${req.ip} : ${req.method} : ${req.path}\n`,(error,data)=>{
    next();
   });
});

app.get('/',function(req,res){
  res.status(200).send({status:true,message:"requested successfully..."})
})

app.use('/api/v1/login',login_routes)
app.use('/api/v1/products',product_routes);
app.use('/api/v1/sales_order',sales_order_routes);

const PORT = process.env.PORT || 3005;
app.listen(PORT,function(){
  console.log(`Server listening on localhost port no : ${PORT} `)
});