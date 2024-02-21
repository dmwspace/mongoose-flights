const FlightModel = require('../model/flight')

module.exports = {
    create,
    new: newFlight,
    index,
    show
}

function newFlight(req, res) {
    const newFlight = newFlightModel()
    const defaultDate = newFlight.departs.toISOString().slice(0, 16)
    res.render('flights/new', {defaultDate})
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
async function show(req, res) {
    try {
        const flightFromDatabase = await FlightModel.findById(req.params.id)
        console.log(flightFromDatabase);
        res.render("flights/show", {
            flight: flightFromDatabase
        })
    } catch(err) {
        res.send(err)
    }
}