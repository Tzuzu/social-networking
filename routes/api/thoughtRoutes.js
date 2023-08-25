const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// /thoughts/

// Displays all thougths if you use GET, creates a new thought if you use POST

router.route('/').get(getThoughts).post(createThought);

// Displays a single thought using GET

router.route('/:thoughtId').get(getSingleThought);

// Updates a single thought using PUT

router.route('/:thoughtId').put(updateThought);

// Deletes a single thought using DELETE

router.route('/:thoughtId').delete(deleteThought);

// Adds a reaction to an existing thought using POST

router.route('/:thoughtId/reactions').post(createReaction);

// Deletes a reaction to an existing thought using DELETE

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;


