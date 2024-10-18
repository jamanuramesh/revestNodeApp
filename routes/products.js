const router = require('express').Router();
const productCtrl = require('../controller/products');
const { check } = require('express-validator');

router.get('/',productCtrl.getAllProducts);

router.get('/:id', [ check('id', 'Invalid Id').isInt() ],
    productCtrl.getProductById    
);

router.post('/',productCtrl.addProduct);

router.put('/:id',[ check('id','Invalid Id').isInt() ],
    productCtrl.updateProduct  
);

router.delete('/:id',[ check('id','Invalid Id').isInt() ],
    productCtrl.deleteProduct
);

module.exports = router;