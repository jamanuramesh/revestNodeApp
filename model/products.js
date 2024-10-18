const getAllProducts = "SELECT * FROM products WHERE status=1";
const getProductById = "SELECT * FROM products WHERE pid=$1 and status=1";
const addProduct = "INSERT INTO products (name,description,image_url,price,quantity,supplier_id,status,created_by,created_date) VALUES ($1,$2,$3,$4,$5,$6,$7,'admin',$8)"          
const updateProduct = "UPDATE products SET name = $1,description=$2,image_url=$3,price=$4,quantity=$5,supplier_id=$6,status=$7,modified_by='admin',modified_date=$8 WHERE pid=$9";
const deleteProduct = "DELETE FROM products WHERE pid=$1";
module.exports = { 
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} 