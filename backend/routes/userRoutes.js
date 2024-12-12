const express = require('express');
const router = express.Router();
const UserController = require('../Controller/userController');


router.get('/', UserController.getUser);
router.get('/:rollno', UserController.getUserByRollno);
router.get('/phone/:phoneno', UserController.getUserByPhone);
router.get('/fingerprint/:fingerprint', UserController.getUserByfingerprint);

router.post('/', UserController.addUser);
router.put('/:rollno', UserController.updateUser);
router.delete('/:rollno', UserController.deleteUserByRollno);

module.exports = router;