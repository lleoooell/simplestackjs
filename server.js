// Chargement des lib 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

// add socket.io
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// connect  DB
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('db connected on port 27017');
});

// IMPORTS SCHEMAS
const Todo = require('./server/api/todo/todo.js');



// DEFINE CONF AND USES 


// app.use('/css', express.static(__dirname + '/client/static/css'));
// app.use('/js', express.static(__dirname + '/client/static/js'));
app.use('/lib', express.static(__dirname + '/client/static/'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
 


// CREATE ROUTES
app.get('/', function (req, res) {
  res.sendFile( __dirname +  "/client/index.html" );

});

app.get('/api/todo', function (req, res) {


  Todo.find({}).exec(function(err, todoList) {
  	if(err){
  		console.log(err);
  	}
    console.log(todoList);
    res.json(todoList);
 	
  });


});

app.post('/api/todo',function(req, res){
	console.log("req.body:");
	console.log(req.body);
	console.log(req.body.todo);

	const toCreate = new Todo(req.body);

	toCreate.save().then(function(newToDo) {
		io.emit("todo_new",newToDo);

		console.log(newToDo);
		res.send(newToDo);

	});

});

app.delete('/api/todo/:id/',function(req, res){

	console.log("req.param:");
	console.log(req.params.id);
	var myIdToFind = req.params.id;

	Todo.findByIdAndDelete(myIdToFind).exec(function(err){
		if(err){console.log(err)}


		io.emit("todo_delete",myIdToFind);		
		res.send('deleted');

	})

	// const toCreate = new Todo(req.body);

	// toCreate.save().then(function(newToDo) {
	
	// 	console.log(newToDo);
	// 	res.send(newToDo);

	// });

});



// handle socket events
io.on('connection', (socket) => {
  console.log('a user connected');
});

// START server

http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})





// api/users => liste de tous les users
// api/users/1 ==> info sur l'user dont l'id est en param
