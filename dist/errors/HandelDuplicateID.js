"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleDuplicateID = (error) => {
    const matches = error.message.match(/"([^"]+)"/);
    const extractedMessage = matches[1];
    const errorSource = [
        {
            path: "",
            message: `${extractedMessage} is already exist`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Property  Already exist",
        errorSource,
    };
};
exports.default = HandleDuplicateID;
