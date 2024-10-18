const getAllSalesOrder = "SELECT so.*,l.*,p.* FROM sales_order as so INNER JOIN login as l ON so.customer_id = l.uid INNER JOIN products as p ON p.pid = so.product_id WHERE so.status = 1";
const getSalesOrderById = "SELECT so.*,l.*,p.* FROM sales_order as so INNER JOIN login as l ON so.customer_id = l.uid INNER JOIN products as p ON p.pid = so.product_id WHERE so.order_id =$1 AND so.status = 1"
const addSalesOrder = "INSERT INTO sales_order (customer_id,order_date,status,total_amount,payment_status,payment_method,tracking_number,actual_delivery_date,created_by,created_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'admin',$9)"          
const updateSalesOrder = "UPDATE sales_order SET name = $1,description=$2,image_url=$3,price=$4,quantity=$5,supplier_id=$6,status=$7,modified_by='admin',modified_date=$8 WHERE order_id=$9";
const deleteSalesOrder = "DELETE FROM sales_order WHERE order_id=$1";
module.exports = {
    getAllSalesOrder,
    getSalesOrderById,
    addSalesOrder,
    updateSalesOrder,
    deleteSalesOrder
}