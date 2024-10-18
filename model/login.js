const getAllUsers = "SELECT * FROM login WHERE status = 1";
const getUserById = "SELECT * FROM login WHERE uid= $1";
const addUser = " INSERT INTO login (first_name,last_name,email,password,mobile_no,created_by,created_date) VALUES ($1,$2,$3,$4,$5,'admin',$6)"
const updateUser = "UPDATE login SET first_name = $1,last_name=$2,email=$3,password=$4,mobile_no=$5,modified_by='admin',modified_date=$6 WHERE uid = $7";
const checkEmailExists = "SELECT * FROM login WHERE email = $1";
const deleteUser = "DELETE FROM login WHERE uid = $1";
const isValidUser = "SELECT * FROM login WHERE email = $1 AND password=$2 AND status = 1";
module.exports = { 
    getAllUsers,
    getUserById,
    addUser,
    checkEmailExists,
    updateUser,
    deleteUser,
    isValidUser
} 