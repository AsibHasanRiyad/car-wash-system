"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const HandelZodError_1 = __importDefault(require("../errors/HandelZodError"));
const HandelMongooseValidationError_1 = __importDefault(require("../errors/HandelMongooseValidationError"));
const HandelCastError_1 = __importDefault(require("../errors/HandelCastError"));
const HandelDuplicateID_1 = __importDefault(require("../errors/HandelDuplicateID"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSource = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, HandelZodError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const simplifiedError = (0, HandelMongooseValidationError_1.default)(error);
        (statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode),
            (message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message),
            (errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource);
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const simplifiedError = (0, HandelCastError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    }
    else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        const simplifiedError = (0, HandelDuplicateID_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorSource = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorSource = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config_1.default.node_env === "development" ? error.stack : null,
        error,
    });
};
exports.default = globalErrorHandler;
