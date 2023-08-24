const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js');

// /users/

// Displays all users if you use GET, creates a new user if you use POST

router.route('/').get(getUsers).post(createUser);

// Displays a single user using GET

router.route('/:userId').get(getSingleUser);

// Updates a single user using PUT

router.route('/:userId').put(updateUser);

// Deletes a single user using DELETE

router.route('/:userId').delete(deleteUser);

// Adds a new friend to a user using POST

router.route('/:userId/friends/:friendId').post(addFriend);

// Deletes a friend from a user using DELETE

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
