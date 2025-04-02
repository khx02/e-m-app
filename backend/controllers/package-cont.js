const path = require('path');
const Package = require('../models/package');
const Driver = require('../models/driver');
const incrementStat = require('../server')

module.exports = {
    createPackage: async (req, res, api = true) => {
        await incrementStat('Create');
        let b = req.body;
        if (api) {
            try {
                let p = new Package({
                    package_title: b.package_title,
                    package_weight: b.package_weight,
                    package_destination: b.package_destination,
                    description: b.description,
                    isAllocated: b.isAllocated,
                    driver_id: b.driver_id, 
                });
                const d = await Driver.findOne({ _id: b.driver_id });
                if (d) {
                    await p.save();
                    await d.assigned_packages.push(p._id);
                    await d.save();
                    res.status(200).json({ 
                        "id": p._id,
                        "package_id": p.package_id,
                    });
                }
                else {
                    res.status(500).json({ message: 'Driver not found' });
                }
            }
            catch (err) {
                res.status(500).json({ error: err });
            }
        }
        else {
            try {
                // find the mongod db id with A1 generated driver id
                let d = await Driver.findOne({ driver_id: b.driver_id });

                let p = new Package({
                    package_title: b.package_title,
                    package_weight: b.package_weight,
                    package_destination: b.package_destination,
                    description: b.description,
                    isAllocated: b.isAllocated,
                    driver_id: d._id,
                });
                await p.save();
                // Maintaining A1 logic, never push to driver.assigned_packages
                return true;
            }
            catch (err) {
                return false;
            }
        }

    },
    getAll: async (req, res, api) => {
        await incrementStat('Read');
        let allPackages = await Package.find({}); 
        if (api) {
            res.status(200).json(allPackages);
        }
        else {
            return allPackages;
        }
    },
    deletePackage: async (req, res, api = true) => {
        await incrementStat('Delete');
        if (api) {
            try {
                // delete by mongoDB id
                const p = await Package.findByIdAndDelete(req.params.id); 
                const d = await Driver.findOneAndUpdate({ assigned_packages: req.params.id }, { $pull: { assigned_packages: req.params.id } });
                p && d ? res.status(200).json({
                     "acknowledged": true,
                     "deletedCount": 1
                }) : 
                res.status(500).json({ 
                    "acknowledged": false,
                    "deletedCount": 0
                });
            }
            catch (err) {
                res.status(500).json({ error: err });
            }
        }
        else {
            try {
                // delete by A1's id
                await Package.findOneAndDelete({ package_id: req.query.packageId });
                return true;
            }
            catch (err) {
                return false;
            }
        }
    },
    updatePackage: async (req, res, api = true) => {
        await incrementStat('Update');
        let b = req.body;
        if (api) {
            try {
                const p = await Package.findOneAndUpdate({ "_id": b.package_id }, {
                    package_destination: b.package_destination,
                });
                p ? res.status(200).json({"status": "updated sucessfully"}) :
                 res.status(500).json({ "status": "Id not found" });
            }
            catch (err) {
                res.status(500).json({ err });
            }
        }
    }
}