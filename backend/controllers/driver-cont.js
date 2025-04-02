const path = require('path');
const Driver = require(path.join(__dirname, '..', 'models', 'driver'));
const Package = require(path.join(__dirname, '..', 'models', 'package'));
const incrementFirestore = require('../server')

module.exports = {
    createDriver: async (req, res, api = true) => {
        await incrementFirestore('Create');
        let b = req.body;
        let driver = new Driver({
            driver_name: b.driver_name,
            driver_department: b.driver_department,
            driver_licence: b.driver_licence,
            driver_isActive: b.driver_isActive,
        }); 

        if (api) {
            try {
                await driver.save();
                res.status(200).json({ 
                    "id": driver._id,
                    "driver_id": driver.driver_id,
                });
            }
            catch (err) {
                res.status(500).json({ err });
            }
        }
        else {
            try {
                await driver.save();
                return true;
            }
            catch (err) {
                return false;
            }
        }

    },
    getAll: async (req, res, api = true) => {
        await incrementFirestore('Read');
        let allDrivers = await Driver.find({}).populate('assigned_packages');
        if (api) {
            res.status(200).json(allDrivers);
        }
        else {
            return allDrivers;
        }
    },
    deleteDriver: async (req, res, api = true) => {
        await incrementFirestore('Delete');
        if (api) {
            try {
                // delete by mongoDB id
                const d = await Driver.findByIdAndDelete(req.query.id);
                const assignedPackages = d.assigned_packages;

                for (let i = 0; i < assignedPackages.length; i++) {
                    await Package.findByIdAndDelete(assignedPackages[i]);
                }
                res.status(200).json({ 
                    "acknowledged": true,
                    "deletedCount": 1,
                });
            }
            catch (err) {
                res.status(500).json({ 
                    "acknowledged": false,
                    "deletedCount": 0,
                });;
            }
        }
        else {
            // delete by A1's driver_id
            try {
                await Driver.deleteOne({ driver_id: req.query.driverId.trim() });
                return true;
            }
            catch (err) {
                return false;
            }
        }
    },
    updateDriver: async(req, res, api = true) => {
        await incrementFirestore('Update');
        let b = req.body;
        if (api) {
            try {
                const d = await Driver.findOneAndUpdate({ "_id": b.id }, {
                    driver_department: b.driver_department,
                    driver_licence: b.driver_licence,
                })

                if (d) {
                    res.status(200).json({
                        "status": "Driver updated successfully"
                    }) 
                } else {
                    res.status(500).json({
                        "status": "ID not found"
                    })
                }
            } catch(err) {
                res.status(500).json({err: err});
            }
        }
    }
}