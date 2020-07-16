const express = require('express');
const app = express();

var toDoS = [{ "todo" : 'acheter du pain'},{"todo": 'passer au pressing'},{"todo" : "finir la vaisselle"}];

// app.use('/css', express.static(__dirname + '/client/static/css'));
// app.use('/js', express.static(__dirname + '/client/static/js'));
app.use('/lib', express.static(__dirname + '/client/static/'));


app.get('/', function (req, res) {
  res.sendFile( __dirname +  "/client/index.html" );

});

app.get('/api/todo', function (req, res) {
  res.json(toDoS);

});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})





// api/users => liste de tous les users
// api/users/1 ==> info sur l'user dont l'id est en param
