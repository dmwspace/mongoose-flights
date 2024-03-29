const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: {
        type: Date
    }
}, {
    timestamps: true
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    departs: {
        type: Date,
        default: function() {
            const today = new Date()
            const oneYearFromNow = today.getFullYear() + 1
            today.setFullYear(oneYearFromNow)
            return today
        }
        },
    destinations: [destinationSchema]
    }, {
        timestamps: true    
})

module.exports = mongoose.model('Flight', flightSchema)