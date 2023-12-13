"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authToken(req, res, next) {
    const authorizationClient = req.headers["authorization"];
    const token = authorizationClient && authorizationClient.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .send({ message: "Please provide valid authorization token" });
    try {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (e) {
        return res.status(403).send({
            message: "Invalid access token"
        });
    }
}
exports.default = authToken;
//# sourceMappingURL=jwtVerify.js.map