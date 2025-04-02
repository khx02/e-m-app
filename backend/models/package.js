const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    package_id: {
        type: String,
        default: packageIdGenerator
    },
    package_title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
        match: /^[a-zA-Z0-9\s]+$/,
        message: 'Package title must be alphanumeric and between 3 and 15 characters'
    },
    package_weight: {
        type: Number,
        required: true,
        min: [0.001, 'Package weight must be > 0']
    },
    package_destination: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15,
        match: /^[a-zA-Z0-9\s]+$/,
        message: 'Package destination must be alphanumeric and between 5 and 15 characters'
    },
    description: {
        type: String,
        maxLength: 30,
        default: ''
    },
    createdAt: {
        type: Date,
        default: new Date().toLocaleString()
    },
    isAllocated: {
        type: Boolean,
        required: true,
        default: false,
        message: 'Package allocation status must be boolean'
    },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Driver',
        message: 'Driver must be mongoose object ID existed in Driver collection'
    }
});

/**
 * Helper function to generate a package ID
 *
 * @returns {string}
 */
function packageIdGenerator() {
    let res = 'P';
    // two random UPPERCASE alphabet
    for (let i = 0; i < 2; i++) {
        res += String.fromCharCode(65 + Math.floor(Math.random() * 26)); 
    }
    res += '-HK-';
    const threeDigits = Math.floor(Math.random() * 1000) - 1;
    if  (threeDigits < 100) {
        res += '0';
    }
    res += threeDigits; // 3 random digits
    return res; // Add a return statement to return the generated driver ID
}


module.exports = mongoose.model("Package", packageSchema); 