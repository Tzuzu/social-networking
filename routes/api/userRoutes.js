const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

router.route('/'.get(getUsers).post(createUser));

router.route('/api/users/:userId').get(getSingleUser);

router.route('/api/users/:userId').put(updateUser);

router.route('/api/users/:userId').delete(deleteUser);

module.exports = router;

// api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list
