const express = require('express');
const axios = require('axios');
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



app.use('/api/v1/login',login_routes)
app.use('/api/v1/products',product_routes);
app.use('/api/v1/sales_order',sales_order_routes);

app.get('/',function(req,res){
  res.status(200).send({status:true,message:"requested successfully..."})
})


//Third Party API call for SalesOrder FETCH && SAVING

const apiUrl = 'https://api.example.com/salesOrder';

app.get('/salesOrder',async function(req,res){
  try {
    const response = await axios.get(apiUrl, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            'Content-Type': 'application/json',
        }
    });
    const salesOrders = response.data;
    res.status(200).send({status:true,data:salesOrders})
    } catch (error) {
        console.error('Error fetching sales orders:', error.message);
    }
})

app.post('/salesOrder', async (req, res) => {
  const orderDetails = req.body;
  try {
    await axios.post(apiUrl, orderDetails, {
      headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          'Content-Type': 'application/json'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
      console.error('Error saving sales order:', error.response ? error.response.data : error.message);
  }
});


const PORT = process.env.PORT || 3005;
app.listen(PORT,function(){
  console.log(`Server listening on localhost port no : ${PORT} `)
});