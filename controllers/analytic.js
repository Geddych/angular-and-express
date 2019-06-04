const order = require('../models/Order')
const moment = require('moment')
const errorHandler = require('../utils/errorHandler')

module.exports.overview = async function(req,res) {
    try {
        const allOrders = await order.find({user:req.user.id}).sort({date: 1})
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1,'d').format('DD.MM.YYYY')] || []

        
        const yesterdayOrdersNumb = yesterdayOrders.length //Количество заказов вчера
        const totalOrdersNumber = allOrders.length // Количество заказов
        const daysNumber = Object.keys(ordersMap).length // Количество дней
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(2) // Количество заказов дней
        const ordersPercent = (((yesterdayOrdersNumb / ordersPerDay)-1)*100).toFixed(2) //Процент количества заказов
        const totalGain = calculatePrice(allOrders) // Общая выручка 
        const gainperDay = totalGain / daysNumber // Выручка в день
        const yesterdayGain = calculatePrice(yesterdayOrders) // Выручка за вчера
        const gainPercent = (((yesterdayGain / gainperDay)-1)*100).toFixed(2) // Процент выручки
        const compareGain = (yesterdayGain - gainperDay).toFixed(2) // Сравнение выручки
        const compareNumber = (yesterdayOrdersNumb - ordersPerDay).toFixed(2) // Сравнение количества заказов

        res.status(200).json({
            gain: {
                percent:Math.abs(+gainPercent),
                compare:Math.abs(+compareGain),
                yesterday:+yesterdayGain,
                isHigher:+gainPercent > 0
            },
            orders:{
                percent:Math.abs(+ordersPercent),
                compare:Math.abs(+compareNumber),
                yesterday:+yesterdayOrdersNumb,
                isHigher:+ordersPercent > 0
            }
        })

    } catch (error) {
        errorHandler(res,error)
    }
}
module.exports.analytic =async function(req,res) {
    try {
        const allOrders = await order.find({user:req.user.id}).sort({date:1})
        const ordersMap = getOrdersMap(allOrders)

        const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)
        const chart = Object.keys(ordersMap).map(label=>{
            const gain = calculatePrice(ordersMap[label])
            const order = ordersMap[label].length
            return {label,gain,order}
        })

        res.status(200).json({average,chart})

    } catch (error) {
        errorHandler(res,error)
    }
}

function getOrdersMap(orders=[]) {
    const daysOrder = {}
    orders.forEach(order=>{
        const date = moment(order.date).format('DD.MM.YYYY')

        if(date === moment().format('DD.MM.YYYY')) {
            return
        }
        if (!daysOrder[date]) {
            daysOrder[date] = []
        }

        daysOrder[date].push(order)
    })


    return daysOrder
}
function calculatePrice(orders = []) {
    return orders.reduce((total,order)=> {
        const orderPrice = order.list.reduce((orderTotal,item)=>{
            return orderTotal += item.cost * item.quantity
        },0)
        return total += orderPrice
    },0)
    
}