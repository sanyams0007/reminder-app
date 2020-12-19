const express = require('express');
/* import { getUser } from '../controllers/userRoute.js' */
const router = new express.Router();
const { getUser, postUser, patchUser, deleteUser } = require('../controllers/userRoute');

/* router.get('/', getUser) = router.get('/user', getUser) */
router.get('/', getUser);
router.post('/', postUser);
router.patch('/', patchUser);
router.delete('/', deleteUser);


module.exports = router;