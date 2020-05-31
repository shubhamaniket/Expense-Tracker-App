const express = require('express');
const {getAllTransactions,createTransaction,deleteTransaction,updateTransaction} = require('../controllers/transactions');
const routes = express.Router();

routes
.route('/getAll')
.get(getAllTransactions);

routes
.route('/createTrans')
.post(createTransaction);

routes
.route('/deleteTrans/:id')
.delete(deleteTransaction);

routes
.route('/updateTrans/:id')
.put(updateTransaction);

module.exports = routes;
