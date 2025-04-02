const mongoose = require('mongoose');

const department = ["Food", "Furniture", "Electronic"];

const driverSchema = mongoose.Schema({
    driver_id: {
        type: String,
        required: true,
        default: driverIdGenerator
    },
    driver_name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxLength: 20,
        match: /^[a-zA-Z\s]+$/,
        message: 'Driver name must be alphabetic and between 3 and 20 characters'
    },
    driver_department: {
        type: String,
        required: true,
        enum: department,
        message: `Driver department must be one of the following: ${department}`
    },
    driver_licence: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s]+$/,
        minLength: 5,
        maxLength: 5
    },
    driver_isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    driver_createdAt: {
        type: Date,
        default: new Date().toLocaleString()
    },
    assigned_packages: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Package' 
    }]
});

/**
 * Static helper function to generate a driver ID
 *
 * @returns {String} The generated driver ID
 */
function driverIdGenerator() {
    let res = 'D';
    const twoDigits = Math.floor(Math.random() * 100) - 1;
    if (twoDigits < 10) {
        res += '0';
    }
    res += twoDigits; 
    res += '-33-';
    // three random UPPERCASE alphabet
    for (let i = 0; i < 3; i++) {
        res += String.fromCharCode(65 + Math.floor(Math.random() * 26)); 
    }
    return res; 
}

module.exports = mongoose.model("Driver", driverSchema); 