// const {Client} = require('pg');

// const client =  new Client({
//     host:"localhost",
//     user:"postgres",
//     port:5432,
//     database:"revest_project1_db",
//     password:"root"
// })

// client.connect().then(()=>console.log('Database client connected'));

const Pool = require('pg').Pool;

const pool =  new Pool({
    host:'localhost',
    user:'postgres',
    port:5432,
    database:'revest_project1_db',
    password:'root'
})

pool.connect().then(()=>console.log('Database pool connected'));

module.exports = pool;