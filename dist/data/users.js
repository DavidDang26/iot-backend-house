"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getStateForUser = void 0;
const firebase_1 = require("./firebase");
const users = () => firebase_1.db.ref("users");
const getStateForUser = async (key) => {
    const user = await users().child(key).once("value");
    return user.val();
};
exports.getStateForUser = getStateForUser;
const addUser = (user) => {
    const customChild = users().child(user.email);
    if (customChild.email) {
        return (0, exports.updateUser)(user.email, user);
    }
    else
        customChild.set(user);
};
exports.addUser = addUser;
const updateUser = (key, data) => users().child(key).update(data);
exports.updateUser = updateUser;
const deleteUser = (key) => users().child(key).remove();
exports.deleteUser = deleteUser;
async function getAllUser() {
    const ref = users();
    const user = await ref.once("value");
    return user.val();
}
exports.getAllUser = getAllUser;
exports.default = {
    getAllUser,
    deleteUser: exports.deleteUser,
    updateUser: exports.updateUser,
    addUser: exports.addUser,
    getStateForUser: exports.getStateForUser
};
//# sourceMappingURL=users.js.map