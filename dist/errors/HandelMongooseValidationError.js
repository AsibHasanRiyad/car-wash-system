"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelMongooseValidationError = (error) => {
    const errorSource = Object.values(error.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: " Validation Error",
        errorSource,
    };
};
exports.default = handelMongooseValidationError;
