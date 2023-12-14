"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCount = exports.getCurrentCount = void 0;
const firebase_1 = require("./firebase");
const counts = () => firebase_1.db.ref("count");
const getCurrentCount = async () => {
    const count = await counts().child("valueId").once("value");
    const currentValue = await count.val();
    await (0, exports.addCount)(currentValue + 1);
    return currentValue;
};
exports.getCurrentCount = getCurrentCount;
const addCount = (newCount) => counts().child("valueId").set(newCount);
exports.addCount = addCount;
exports.default = {
    getCurrentCount: exports.getCurrentCount
};
//# sourceMappingURL=count.js.map