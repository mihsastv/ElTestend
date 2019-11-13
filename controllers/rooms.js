const Room = require('../models/Room')
const Calendar = require('../models/Calendar')

module.exports.Room = async function (req, res) {
    const room = await Room.find();
    try {
            if (room) {
                res.status(200).json(room)
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

module.exports.RoomID = async function (req, res) {
    const room = await Room.findOne({room: req.params.id});
    try {
        if (room) {
            res.status(200).json(room)
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


//добавить номер
module.exports.addRoom = async function (req, res) {
    const double = await Room.findOne({room: req.body.room})

    if (double) {
        // Комната существует
        res.status(409).json({
            message: 'Комната с таким же номером существует'
        })
    } else {
        //Создаем комнату
        const room = new Room({
            room: req.body.room,
            description: req.body.description
        })


        //создаем календарь комнаты
        function createContactsArray(len){
            for(var i = 1, arr = []; i <= len; i++) {
                arr.push({'date': i,
                          'avail': 1,
                          'room': req.body.room});
            }
            return arr;
        }
        var cal = createContactsArray(365);


        try {
            await room.save()
                .then(await Calendar.insertMany(cal)
                    .then(res.status(201).json({room, cal})))   //
            }
        catch (err) {
            //обработать ошибку
            res.status(500).json({
                success: false,
                message: err.message ? err.message : err
            })
        }

    }
}



//удалить номер
module.exports.removeRoom = async function (req, res) {
    const avail = await Room.findOne({room: req.params.id})

    if (avail) {
        //Удаляем комнату и календарь
        try {
             await Room.deleteMany({room: req.params.id})
                 .then(Calendar.deleteMany({room: req.params.id})
                     .then(res.status(200).json({ deleted: true})))

        }
        catch (err) {
            //обработать ошибку
            res.status(500).json({
                success: false,
                message: err.message ? err.message : err
            })
        }

    } else {
        // Комната не существует
        res.status(410).json({
            message: 'Комната с таким номером не существует'
        })

    }

}
//изменить номер
module.exports.editRoom = async function (req, res) {
    const avail = await Room.findOne({room: req.params.id})

    if (avail) {
        //изменение комнаты
        try {
            await Room.updateOne({room: req.params.id},
                      {$set: {room: req.body.room, description: req.body.description}}
            )
                .then(res.status(200).json({ update: true}))
        }
        catch (err) {
            //обработать ошибку
            res.status(500).json({
                success: false,
                message: err.message ? err.message : err
            })
        }

    } else {
        // Комната не существует
        res.status(410).json({
            message: 'Комната с таким номером не существует'
        })

    }

}



