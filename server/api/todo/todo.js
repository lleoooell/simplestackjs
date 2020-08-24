const mongoose = require('mongoose');


var TodoSchema = mongoose.Schema({ todo: 'string' });

const Todo = mongoose.model('Todo', TodoSchema);


module.exports = Todo; // this is what you want

