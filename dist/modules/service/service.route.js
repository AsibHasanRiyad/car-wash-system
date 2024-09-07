"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/create-service", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(service_validation_1.ServiceValidation.createServiceValidationSchema), service_controller_1.ServiceController.createService);
// get all services
router.get("/", service_controller_1.ServiceController.getAllServices);
// get single service
router.get("/:id", service_controller_1.ServiceController.getSingleServices);
// delete single service
router.delete("/:id", service_controller_1.ServiceController.deleteSingleService);
// update single service
router.patch("/:id", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(service_validation_1.ServiceValidation.updateServiceValidationSchema), service_controller_1.ServiceController.updateSingleService);
exports.ServiceRoutes = router;
