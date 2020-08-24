const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('db connected on port 27017');



});


const Todo = require('./server/api/todo/todo.js');


var toDos = [{ "todo" : 'acheter du pain'},{"todo": 'passer au pressing'},{"todo" : "finir la vaisselle"}];

toDos.forEach(function(newtodo) {

	const toCreate = new Todo(newtodo);
	toCreate.save().then(() => console.log('to do saved'));

	// body...
})