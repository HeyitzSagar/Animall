const MilkingSession = require('../models/milkSession.model');
const _ = require('lodash');
const mongoose = require('mongoose');


const createMilkingSession = async(req, res) => {
    const session = await mongoose.startSession(); 
    session.startTransaction();
    try {
        const body = _.pick(req.body, ['startTime', 'endTime', 'duration', 'milkQuantity'])
        const milkingSession = new MilkingSession(body);
        const createdData = await milkingSession.save({session});
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            data: createdData
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error creating Milking Session:", error);
        return res.status(500).json({ success: false, message: "Error Creating Milking Session", error: error.message });
    }
}

const getMilkingSessions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; 
        const skip = (page - 1) * limit;

        const milkingSessions = await MilkingSession.find({})
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit);

        const totalRecords = await MilkingSession.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);

        res.json({
            success: true,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalRecords: totalRecords,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                data: milkingSessions,
            }
            
        });

    } catch (error) {
        console.error("Error getting Milking Sessions:", error);
        return res.status(500).json({
            success: false,
            message: "Error Getting Milking Sessions",
            error: error.message
        });
    }
};


module.exports = {createMilkingSession, getMilkingSessions};