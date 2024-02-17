const FlightModel = require('../model/flight')

module.exports = {
    create,
    new: newFlight,
    index
}

function newFlight(req, res) {
    res.render('flights/new')
}

async function create(req, res) {
    console.log(req.body)
    console.log(FlightModel)
    try {
        const createdFlightDoc = await FlightModel.create(req.body)
        res.redirect('flights')
    } catch(err) {
        console.group(err);
        res.redirect('flights')
    }
}

async function index(req, res) {
    try {
        const createdAllFlights = await FlightModel.find({})
        console.log(createdAllFlights)
        res.render('flights', {flights: createdAllFlights})
    } catch(err) {
        console.group(err)
        res.render('flights')
    }
}