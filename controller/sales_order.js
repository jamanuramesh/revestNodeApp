const pool_db = require('../database');
const queries = require('../model/sales_order'); 
const formatedDates = require('../utils/common');
const { validationResult } = require('express-validator');
const getAllSalesOrder = (req,res)=>{
    const { name, email, mobileNumber, status, orderDate } = req.query;
        let values = [];
        // Dynamic query building
        if (name) {
        values.push(`%${name}%`);
        getAllSalesOrder += ` AND name ILIKE $${values.length}`;
        }

        if (email) {
        values.push(`%${email}%`);
        getAllSalesOrder += ` AND email ILIKE $${values.length}`;
        }

        if (mobileNumber) {
        values.push(mobileNumber);
        getAllSalesOrder += ` AND mobile_no = $${values.length}`;
        }

        if (status) {
        values.push(status);
        getAllSalesOrder += ` AND status = $${values.length}`;
        }

        if (orderDate) {
        values.push(orderDate);
        getAllSalesOrder += ` AND order_date = $${values.length}`;
        }
    try {
        pool_db.query(queries.getAllSalesOrder,(error,result)=>{
            if(!error){
                res.status(200).send({status:true,data:result.rows})
            }else{
                throw error;
            }
        })
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching sales orders');
      }
} 

const getSalesOrderById = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        pool_db.query(queries.getSalesOrderById,[id],(error,result)=>{
            if(error) throw error;
            res.status(200).send({status:true,data:result.rows})
        })
    }
}

const addSalesOrder = async (req,res)=>{
    const cdate = formatedDates.dateByDMY(new Date());
    // const {fname,lname,email,password,phone} = req.body;
    // pool_db.query(queries.addSalesOrder,[fname,lname,email,password,phone,cdate],(error,result)=>{
    //     if(error) throw error;
    //     res.status(201).send({status:true,data:"SalesOrder Added successfully"})
    // })

    const jdata = req.body;
    const records = jdata?.products
    try {
        await saveMultipleRecords(records);
        res.status(201).send({status:true,data: 'Sales Order Placed successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send({status:false,data: 'Error saving records'});
    }
}

const updateSalesOrder = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        const mdate = formatedDates.dateByDMY(new Date());
        const {fname,lname,email,password,phone} = req.body;
        //check if sales order exists or not with id
        pool_db.query(queries.getSalesOrderById,[id],(error,result)=>{
            if(error) throw error;
            if(result.rows.length>0){
                pool_db.query(queries.updateSalesOrder,[fname,lname,email,password,phone,mdate,id],(error,result)=>{
                    if(error) throw error;
                    res.status(201).send({status:true,data:"Sales Order Updated successfully"})
                })
            }else{
                res.send('Sales Order does not exists');
            }
        })
    }
}


const deleteSalesOrder = (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        pool_db.query(queries.deleteSalesOrder,[id],(error,result)=>{
            if(error) throw error;
            res.status(200).send({status:true,data:"Sales Order deleted successfully"})
        })
    }
}

async function saveMultipleRecords(records){
    const cdate = formatedDates.dateByDMY(new Date())
    try {
        await pool_db.query('BEGIN');
        for (const record of records) {
            await pool_db.query(queries.addSalesOrder, [1,cdate,1,record.selectedQuantity,'completed','online','admin',cdate,record.pid]);
        }
        await pool_db.query('COMMIT'); 
    } catch (error) {
        await pool_db.query('ROLLBACK'); 
        throw error;
    } finally {
        //pool_db.end();
    }
}

module.exports = {
    getAllSalesOrder,
    getSalesOrderById,
    addSalesOrder,
    updateSalesOrder,
    deleteSalesOrder
}