const express = require('express')
const router = express.Router()
const controller = require('../controllers/rooms')

router.get('/', controller.Room)
router.get('/:id', controller.RoomID)
router.post('/addroom', controller.addRoom)
router.patch('/editroom/:id', controller.editRoom)
router.delete('/removeroom/:id', controller.removeRoom)


module.exports = router
