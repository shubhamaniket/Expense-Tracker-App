const Transaction = require('../models/Transaction');
//@desc     Get All Transactions
//@route    GET /getAll 
//@access   public
exports.getAllTransactions = async (req,res,next)=>{
    try{
        const transactions = await Transaction.find();
        res.status(200).json({
            count : transactions.length,
            success : true,
            data : transactions
        })
    }
    catch(err){
        res.status(500).json({
            message : 'Server Error'
        })
    }
}
//@desc     Create a transaction
//@route    POST /createTrans
//@access   public
exports.createTransaction = async (req,res,next)=>{
    try{
        const transaction = await Transaction.create(req.body);
        res.status(201).json({
            success : true,
            data : transaction
        })
    }
    catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        else{
            res.status(500).json({
                message : 'Server Error'
            })
        }
    }
}

//@desc     delete a trasaction
//@route    DELETE /deleteTrans
//@access   public

exports.deleteTransaction = async (req,res,next)=>{
    try{
        const trasaction = await Transaction.findByIdAndDelete(req.params.id);
        if(!trasaction){
            return res.status(400).json({
                success : false,
                message : 'Transaction not found'
            })
        }
        res.status(200).json({
            success : true,
            message : 'Deleted Successfully !'
        })
    }
    catch(err){
        res.status(500).json({
            message : 'Server Error'
        })
    }
}

//@route    PUT /updateTrans
//@desc     updates transaction
//@access   public
exports.updateTransaction = async (req,res,next)=>{
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        });
        if(!transaction){
            return res.status(400).json({
                success : false,
                message : 'Transaction not found'
            })
        }
        res.status(200).json({
            success : false,
            data : transaction
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            message : 'Server Error'
        })
    }
}