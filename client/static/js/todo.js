// console.log('hello script');

var ul = document.getElementById("TodoUl");

function addTodo(todo) {
    var li = document.createElement('li');
    li.innerHTML = todo.todo;
    // li.id = index;
    var buttonD = document.createElement("button");
    buttonD.innerHTML = "X";
    buttonD.classList.add("deleteBtn");

    buttonD.onclick = function(event){
    	console.log(event);
    	console.log(event.target);
    	var toRem = event.target.parentNode;
    	console.log(toRem);
    	// ul.removeChild(toRem);
    
    	toRem.remove();
    }
    li.appendChild(buttonD);
    ul.appendChild(li);
}

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


// gérer le clic évent
var btn = document.getElementById('clicBtn');

btn.onclick = function() {
    console.log('btn cliqué');
    // récupérer la valeur d'un champ input
    var value = document.getElementById("newTodo").value;
    console.log(value);
    // formater la valeur de l'input pour la faire correspondre à notre modèle todo = {"todo" : String} et l'envoyer à la fonction addTodo
    addTodo({"todo" : value});
    // reset la valeur du champ pour permettre d'entrer une nouvelle valeur
    document.getElementById("newTodo").value = '';
}