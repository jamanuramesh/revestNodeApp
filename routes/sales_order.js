const router = require('express').Router();
const salesOrderCtrl = require('../controller/sales_order');
const {check}  = require('express-validator');

router.get('/',salesOrderCtrl.getAllSalesOrder);

router.get('/:id',[ check('id','Invalid Id').isInt() ],
    salesOrderCtrl.getSalesOrderById
);

router.post('/',salesOrderCtrl.addSalesOrder);

router.put('/:id',[ check('id','Invalid Id').isInt() ],
    salesOrderCtrl.updateSalesOrder
);

router.delete('/:id',[ check('id','Invalid Id').isInt() ],
    salesOrderCtrl.deleteSalesOrder
)

module.exports = router;