const router = require('express').Router();
const productCtrl = require('../controller/products');
const { check } = require('express-validator');

router.get('/',productCtrl.getAllProducts);

router.get('/:id', [ check('id', 'Invalid Id').isInt() ],
    productCtrl.getProductById    
);

// router.post('/',productCtrl.addProduct);

router.post('/',[
    check('name','Invalid Name').isString(),
    check('description',"Invalid Description").isString(),
    check('price','Invalid price').isFloat(),
    check('quantity','Invalid Quantity').isInt()
],productCtrl.createProduct);

router.put('/:id',[ check('id','Invalid Id').isInt() ],
    productCtrl.updateProduct  
);

router.delete('/:id',[ check('id','Invalid Id').isInt() ],
    productCtrl.deleteProduct
);

module.exports = router;