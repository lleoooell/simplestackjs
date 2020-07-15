const express = require('express');
const app = express();
var data = [{'name': "leo"},{"name":'Tom'}];
// app.use('/css', express.static(__dirname + '/client/static/css'));
// app.use('/js', express.static(__dirname + '/client/static/js'));
app.use('/lib', express.static(__dirname + '/client/static/'));

app.get('/', function (req, res) {
  res.sendFile( __dirname +  "/client/index.html" );

})


app.get('/api/users', function (req, res) {
  res.json( data);

})
app.post('/api/login', function (req, res) {
// process data here before return /
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
