"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = ((req, res, next) => {
    const url = req.params.title;
    console.log(`url visited ${url}`);
    next();
});
exports.default = logger;
