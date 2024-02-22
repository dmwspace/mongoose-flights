const TicketModel = require('../models/ticket')
const FlightModel = require('../models/flight')

module.exports = {
    new: newTicket,
    create,
    addToTickets
}

async function newTicket(req, res) {
    try {
        const allTickets = await TicketModel.find({})
        res.render("tickets/new", {
            title: "Add ticket",
            tickets: allTickets
        });
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

async function create(req, res) {
    try {
        console.log(`req.body: ${req.body}`)
        const createdTicket = await TicketModel.create(req.body)
        console.log(`createdTicket ${createdTicket}`)
        res.redirect("/tickets/new");
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

async function addToTickets(req, res) {
    try {
        console.log(req.body)
        const flightDoc = await FlightModel.findById(req.params.flightId);
        const ticketDoc = await TicketModel.create(req.body)
        flightDoc.tickets.push(ticketDoc._id);
        await flightDoc.save()
        res.redirect(`/flights/${flightDoc._id}`)
    } catch(err) {
        console.log(err);
        res.send(err)
    }
}