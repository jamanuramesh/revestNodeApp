const getAllProducts = "SELECT * FROM products WHERE status=1";
const getProductById = "SELECT * FROM products WHERE pid=$1 and status=1";
const addProduct = "INSERT INTO products (name,description,image_url,price,quantity,status,created_by,created_date) VALUES ($1,$2,$3,$4,$5,$6,'admin',$7)"          
const updateProduct = "UPDATE products SET name = $1,description=$2,image_url=$3,price=$4,quantity=$5,status=$6,modified_by='admin',modified_date=$7 WHERE pid=$8";
const deleteProduct = "DELETE FROM products WHERE pid=$1";
module.exports = { 
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} 