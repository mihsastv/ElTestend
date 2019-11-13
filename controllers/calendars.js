const Calendar = require('../models/Calendar')

module.exports.All = async function (req, res) {
    const count = await Calendar.find({"date" : {$gte : req.body.datestart, $lte : req.body.dateend}}).distinct('date')
    const countl=count.length
    var skip = req.body.page-1
        skip = skip*req.body.limit
    const curpage=req.body.page
    const allpage = Math.ceil(countl/req.body.limit)
    const all = await Calendar.aggregate([
                                 {
                                     $match: {"date" : {$gte : req.body.datestart, $lte : req.body.dateend}}
                                 },
                                 {
                                     $group:{
                                            _id: { date: "$date"},
                                            rooms: { $push:  { room: "$room", avail: "$avail" }},
                                            avail: { $sum: "$avail"}
                                     }
                                },
                                 {
                                      $sort : {_id:  1}
                                 },
                                 {
                                      $skip: skip
                                 },
                                 {
                                      $limit: req.body.limit
                                 }
                                   ])



    try {
        if (all) {
            res.status(200).json({allpage, curpage, countl, all})
        }
    }
    catch (err) {
        //обработать ошибку
        res.status(500).json({
            success: false,
            message: err.message ? err.message : err
        })
    }

}

module.exports.Allid = async function (req, res) {
    const count = await Calendar.count({$and:[{"date" : {$gte : req.body.datestart, $lte : req.body.dateend}},
                                              {"room": req.params.id}]})
    const allpage = Math.ceil(count/req.body.limit)
    const curpage=req.body.page
    var skip = req.body.page-1
               skip = skip*req.body.limit
    const all = await Calendar.find({$and:[{"date" : {$gte : req.body.datestart, $lte : req.body.dateend}},
            {"room": req.params.id}]}).skip(skip).limit(req.body.limit)

    try {
        if (all) {
            res.status(200).json({allpage, curpage, all})
        }
    }
    catch (err) {
        //обработать ошибку
        res.status(500).json({
            success: false,
            message: err.message ? err.message : err
        })
    }

}

module.exports.Booking = async function (req, res) {
    const opp = await Calendar.find({$and:[{"date" : {$gte : req.body.datestart, $lte : req.body.dateend}},
                                           {"avail": 1},
                                           {"room": req.params.id}]})

    try {
    if (opp.length !== 0) {
        await Calendar.updateMany(
            {$and:[{"date" : {$gte : req.body.datestart, $lte : req.body.dateend}},
                   {"avail": 1},
                   {"room": req.params.id}]},              // критерий фильтрации
            { $set: {avail: 0}})                    // параметр обновления
            .then(res.status(200).json({booking: true}))
    } else {
        // если нет возможности забронировать
        res.status(410).json({
            code: 'error',
            message: 'Такой комнаты нет или она забронированна'
        })
    }
    }
    catch (err) {
        //обработать ошибку
        res.status(500).json({
            success: false,
            message: err.message ? err.message : err
        })

    }

}

module.exports.unBooking = async function (req, res) {
    try {
            await Calendar.updateMany(
                {$and:[{"date" : {$gte : req.body.datestart, $lte : req.body.dateend}},
                       {"room": req.params.id}]},              // критерий фильтрации
                { $set: {avail: 1}})                    // параметр обновления
                .then(res.status(200).json({unbooking: true}))
    }
    catch (err) {
        //запрос не выполнился
        res.status(500).json({
            success: false,
            message: err.message ? err.message : err
        })

    }

}



