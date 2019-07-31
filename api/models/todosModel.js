const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
  id: String,
  title: {
    type: String,
    validate: /\S{3,}/,
    required: true
  },
  description: {
    type: String,
    validate: /\S{10,}/,
    required: true
  },
  completed: Boolean
});

const TodoModel = mongoose.model("todos", todosSchema);

module.exports = TodoModel;
