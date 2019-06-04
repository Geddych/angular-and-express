const mongoose = require('mongoose')
const Schema = mongoose.Schema


    Date.now = function now() {
      return new Date().getTime();
    }
const orderSchema = new Schema ({
    date:{
        type: Date,
        default:Date.now
    },
    order:{
        type:Number,
        required:true
    },
    list:[{
        name:{
            type:String
        },
        cost:{
            type:Number
        },
        quantity: {
            type:Number
        }
    }],
    user:{
        ref:'users',
        type:Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('orders',orderSchema)