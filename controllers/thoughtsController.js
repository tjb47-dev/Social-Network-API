// Import user and thought models
const { User, Thought } = require("../models");

module.exports = {
//Get Thoughts        
  getThoughts(req, res) {
    console.log("get thoughts");
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
//Get Single Thought    
  getSingleThought(req, res) {
    console.log("get single thought");
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
//Create Thought    
  createThought(req, res) {
    console.log("create thoughts");
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({
                message: "Thought created, but found no user with that ID",
              })
          : res.json("Created the thought")
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
//Update Thought  
  updateThought(req, res) {
    console.log("update thought");
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
//Delete Thought  
  deleteThought(req, res) {
    console.log("delete thought");
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID." })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
//Add Reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No application with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
//Delete Reaction
  deleteReaction(req, res) {
    console.log("delete reaction");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
