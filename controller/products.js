const pool_db = require('../database');
const queries = require('../model/products');
const formatedDates =  require('../utils/common');
const { validationResult } = require('express-validator');
const getAllProducts = (req,res)=>{
    pool_db.query(queries.getAllProducts,(error,result)=>{
    if(!error){
        res.status(200).send({status:true,data:result.rows})
    }else{
        throw error;
    }
   })
} 

const getProductById = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        pool_db.query(queries.getProductById,[id],(error,result)=>{
            if(error) throw error;
            res.status(200).send({status:true,data:result.rows})
        })
    }
}

const addProduct = (req,res)=>{
    const cdate = formatedDates.dateByDMY(new Date())
    const {name,description,image_url,price,quantity,supplier_id,status} = req.body;
    pool_db.query(queries.addProduct,[name,description,image_url,price,quantity,supplier_id,status,cdate],(error,result)=>{
        if(error) throw error;
        res.status(201).send({status:true,data:"Product Added successfully"})
    })
}

const createProduct = async(req,res)=>{
    const records = req.body;
    try {
        await saveMultipleRecords(records);
        res.status(201).send({status:true,data: 'Product/s saved successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send({status:false,data: 'Error saving records'});
    }
}



const updateProduct = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        const mdate = formatedDates.dateByDMY(new Date());
        const {name,description,image_url,price,quantity} = req.body;
        //check if Product exists or not with id
        pool_db.query(queries.getProductById,[id],(error,result)=>{
            if(error) throw error;
            if(result.rows.length>0){
                pool_db.query(queries.updateProduct,[name,description,image_url,price,quantity,1,mdate,id],(error,result)=>{
                    if(error) throw error;
                    res.status(201).send({status:true,data:"Product Updated successfully"})
                })
            }else{
                res.send('Product does not exists');
            }
        })
    }

}

const deleteProduct = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        pool_db.query(queries.deleteProduct,[id],(error,result)=>{
            if(error) throw error;
            res.status(200).send({status:true,data:"Product deleted successfully"})
        })
    }
}

async function saveMultipleRecords(records){
    const cdate = formatedDates.dateByDMY(new Date())
    try {
        await pool_db.query('BEGIN');
        for (const record of records) {
            await pool_db.query(queries.addProduct, [record.name,record.description,record.image_url,record.price,record.quantity,1,cdate]);
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
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    createProduct
}