const { User } = require('../models')

module.exports = {

    // Get all users

    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Get a single user

    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Create a new user

    async createUser(req, res) {
      console.log(req.body);
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Update a user

    async updateUser(req, res) {
        try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body},
            { new:true}
            );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }
        res.json(user);
    }
    catch (err){
        res.status(500).json(err)
    }
    },

    // Delete a User

    async deleteUser(req, res) {
        try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json({ message: 'User deleted!' })
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // POST to add a new friend to a user's friend list

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
    
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
    
            res.json({ message: 'Friend Added!' })
            } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove a friend from a user's friend list

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
    
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
    
            res.json({ message: 'Friend Deleted!' })
            } catch (err) {
            res.status(500).json(err);
        }
    }
  };