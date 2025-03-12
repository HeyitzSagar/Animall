const { body, validationResult } = require('express-validator');

// Validation rules for creating a Milking Session
const validateCreateMilkingSession = [
    body('startTime')
        .isISO8601()
        .withMessage('startTime must be a valid ISO 8601 date')
        .notEmpty()
        .withMessage('startTime is required'),

    body('endTime')
        .isISO8601()
        .withMessage('endTime must be a valid ISO 8601 date')
        .notEmpty()
        .withMessage('endTime is required'),

    body('duration')
        .isInt({ min: 1 })
        .withMessage('duration must be an integer and at least 1'),

    body('milkQuantity')
        .isFloat({ min: 0 })
        .withMessage('milkQuantity must be a positive number'),

    // Middleware to check validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: errors.array().map(err => err.msg)
            });
        }
        next();
    }
];

module.exports = { validateCreateMilkingSession };
