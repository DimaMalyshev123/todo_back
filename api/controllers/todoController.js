const Todo = require("../models/todosModel");

const todoController = {
  async getToDos(req, res) {
    const todo = await Todo.find();
    return res.send(todo);
  },

  async deleteToDo(req, res) {
    await Todo.remove({ _id: req.params.id });
    todoController.getToDos(req, res);
  },

  async deleteCompleted(req, res) {
    await Todo.remove({ completed: true });
    todoController.getToDos(req, res);
  },

  async allCompleted(req, res) {
    await Todo.updateMany({ completed: false }, { completed: true });
    todoController.getToDos(req, res);
  },

  async addToDo(req, res, next) {
    try {
      const todo = new Todo({
        ...req.body
      });
      await todo.save();
      todoController.getToDos(req, res);
    } catch (error) {
      error.msg = "";
      if (error.errors.title) {
        error.msg += "Title is required. Min length 3. ";
      }
      if (error.errors.description) {
        error.msg += "Description is requred. Min length 10.";
      }
      next(error);
    }
  },

  async editToDo(req, res, next) {
    const todo = await Todo.findById(req.body._id);

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.completed = req.body.completed;

    try {
      await todo.save();
      todoController.getToDos(req, res);
    } catch (error) {
      error.msg = "";
      if (error.errors.title) {
        error.msg += "Title is required. Min length 3. ";
      }
      if (error.errors.description) {
        error.msg += "Description is requred. Min length 10.";
      }
      next(error);
    }
  }
};

module.exports = todoController;
