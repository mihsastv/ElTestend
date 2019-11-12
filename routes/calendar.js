const express = require('express')
const router = express.Router()
const controller = require('../controllers/calendars')

router.get('/all/:id', controller.Allid)
router.patch('/booking/:id', controller.Booking)
router.patch('/unbooking/:id', controller.unBooking)

module.exports = router
