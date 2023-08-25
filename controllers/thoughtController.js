const { User, Thought } = require('../models');

// /api/thoughts

module.exports = {
    
    // Get all thoughts

    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // GET to get a single thought by its _id

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // POST to create a new thought (push the created thought's _id to the associated user's thoughts array)

        async createThought(req, res) {
            console.log(req.body);
            try {
                const thought = await Thought.create(req.body);
                // Not needed?
                // const user = await User.findOneAndUpdate(
                //     { _id: req.body.userId },
                //     { $push: { thought: thought.id }},
                //     { new: true }
                // );

                // if(!user) {
                //     return res
                //         .status(404)
                //         .json({ message: 'No user with that ID' })
                // }
                res.json(thought);
            }  catch (err) {
                console.log(err)
                res.status(500).json(err)
            }
        },

    // PUT to update a thought by its _id

        async updateThought(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $set: req.body },
                    { runValidators: true, new: true }
                );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            } res.json(thought);
            }
            catch (err) {
                res.status(500).json(err)
            }
        },

    // DELETE to remove a thought by its _id

        async deleteThought(req, res) {
            try {
                const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({ message: 'Thought deleted!' })
            } catch (err) {
                res.status(500).json(err)
            }
        },

    // /api/thoughts/:thoughtId/reactions

    // POST to create a reaction stored in a single thought's reactions array field

        async createReaction(req, res) {
            try {
                const reaction = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    // { $addToSet: {reaction: req.params.reactionId }}
                    { $push: { reactions: req.body }},
                    { runValidators: true, new: true }
                );

                if (!reaction) {
                    return res.status(404).json({ message: 'No thought with that ID' })
                }
                
                res.json({ message: 'Reaction Added!'})
            } catch (err) {
                res.status(500).json(err)
            }
        },

    // DELETE to pull and remove a reaction by the reaction's reactionId value

        async deleteReaction(req, res) {
            try {
                const reaction = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    // { $pull: { reactions: req.params.reactionId }}
                    { $pull: { reactions: { _id: req.params.reactionId }}},
                    { runValidators: true, new: true }
                );
                
                if (!reaction) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                }

                res.json({ message: 'Reaction Deleted!' })
                } catch (err) {
                    res.status(500).json(err);
                }
        }   
    };