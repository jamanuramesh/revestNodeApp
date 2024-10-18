const pool_db = require('../database');
const queries = require('../model/login'); 
const formatedDates = require('../utils/common');
const { validationResult } = require('express-validator');
const getAllUsers = (req,res)=>{
    pool_db.query(queries.getAllUsers,(error,result)=>{
    if(!error){
        res.status(200).send({status:true,data:result.rows})
    }else{
        throw error;
    }
   })
} 

const getUserById = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        pool_db.query(queries.getUserById,[id],(error,result)=>{
            if(error) throw error;
            res.status(200).send({status:true,data:result.rows})
        })
    }
}

const addUser = (req,res)=>{
    const cdate = formatedDates.dateByDMY(new Date());
    const {fname,lname,email,password,phone} = req.body;
    //check if user already exists with email
    pool_db.query(queries.checkEmailExists,[email],(error,result)=>{
        if(error) throw error;
        if(result.rows.length>0){
            res.send('Email already exists');
        }else{
            pool_db.query(queries.addUser,[fname,lname,email,password,phone,cdate],(error,result)=>{
                if(error) throw error;
                res.status(201).send({status:true,data:"User Added successfully"})
            })
        }
    })
}

const isValidUser = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        //check if valid user or not
        const {email,password} = req.body;
        pool_db.query(queries.isValidUser,[email,password],(error,result)=>{
            if(error) throw error;
            res.status(200).send({status:true,data:1});
        })
    }
}

const updateUser = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        const mdate = formatedDates.dateByDMY(new Date());
        const {fname,lname,email,password,phone} = req.body;
        //check if user exists or not with id
        pool_db.query(queries.getUserById,[id],(error,result)=>{
            if(error) throw error;
            if(result.rows.length>0){
                pool_db.query(queries.updateUser,[fname,lname,email,password,phone,mdate,id],(error,result)=>{
                    if(error) throw error;
                    res.status(201).send({status:true,data:"User Updated successfully"})
                })
            }else{
                res.send('User does not exists');
            }
        })
    }
    
}

const deleteUser = (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }else{
        const id = parseInt(req.params.id);
        pool_db.query(queries.deleteUser,[id],(error,result)=>{
            if(error) throw error;
            res.status(200).send({status:true,data:"User deleted successfully"})
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    isValidUser
}