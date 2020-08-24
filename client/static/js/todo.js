// console.log('hello script');

var ul = document.getElementById("TodoUl");
// récupérer les données sur l'api : 
fetch('/api/todo')
    .then(function(response) {
        console.log(response);
        // response texte to json
        return response.json();

    })
    .then(function(myJson) {

        // pour chaque objet de la collection, ajouter un li via la fonction addTodo

        myJson.forEach(function(item) {
            console.log(item);
            addTodo(item);
        });

    });


    

function removeTodo(id) {
    console.log(id);

    fetch('/api/todo/' + id, {
            method: 'DELETE',
        })
        .then(function(res) {
            return res.text()
        }) // or res.json()
        .then(function(res) {
            console.log(res);
            
        });
}

function addTodo(todo) {


    // step1 : crée un li 
    var li = document.createElement('li');
    // step2 : ajoute du contenu au li
    li.innerHTML = todo.todo;

    // step 3 : crée button pour supprimer
    var buttonD = document.createElement("button");

    buttonD.innerHTML = "X";
    // li.dataset.idtoremove = todo._id;
    li.id = todo._id;
    buttonD.classList.add("deleteBtn");


    buttonD.onclick = function(event) {
        console.log(event);
        console.log(event.target);
        var toRem = event.target.parentNode;

        removeTodo(toRem.id);
        // ul.removeChild(toRem);

        // toRem.remove();
    }
    li.appendChild(buttonD);
    ul.appendChild(li);
}



function createTodo(todo) {
    fetch('/api/todo', {
        method: 'post',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        console.log("response");
        console.log(response);
        return response.json();
    }).then(function(data) {
        console.log(data);
        // addTodo(data);
    });
    // body...
}
// gérer le clic évent
var btn = document.getElementById('clicBtn');

btn.onclick = function() {
    console.log('btn');
    // récupérer la valeur d'un champ input
    var value = document.getElementById("newTodo").value;
    console.log(value);


    // formater la valeur de l'input pour la faire correspondre à notre modèle todo = {"todo" : String} et l'envoyer à la fonction addTodo
    createTodo({
        "todo": value
    });
    // reset la valeur du champ pour permettre d'entrer une nouvelle valeur
    document.getElementById("newTodo").value = '';
}





const socket = io();

socket.on('todo_delete', function(socket) {
    console.log('socket io return confirmation');
    console.log(socket);
    var torem = document.getElementById(socket);
    torem.remove();
})

socket.on('todo_new', function(socket) {

    console.log('socket io return new add');
    console.log(socket);
    addTodo(socket);
});