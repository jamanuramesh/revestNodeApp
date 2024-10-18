const router = require('express').Router();
const loginCtrl = require('../controller/login');
const { check } = require('express-validator');

router.get('/',loginCtrl.getAllUsers);

router.get('/:id',[ check('id','Invalid ID').isInt() ],
    loginCtrl.getUserById
);

router.post('/',loginCtrl.addUser);

router.post('/check', [
    check('password', 'password is required').notEmpty(),
    check('email', 'email is invalid').isEmail()
],loginCtrl.isValidUser);

router.put('/:id',[ check('id','Invalid ID').isInt() ],
    loginCtrl.updateUser
);

router.delete('/:id',[ check('id','Invalid ID').isInt() ],
    loginCtrl.deleteUser
)

module.exports = router;