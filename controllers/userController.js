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
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Update a user
    async updateUser(req, res) {
        const user = await User.findOne({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }
    },
    // Delete a user and associated apps
    async deleteUser(req, res) {
        try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        await Application.deleteMany({ _id: { $in: user.applications } });
        res.json({ message: 'User and associated apps deleted!' })
        } catch (err) {
        res.status(500).json(err);
        }
    },
  };