var DEFAULT = 0;
var DONE = 1;
var REMOVE = 2;
var PRIORITY = 3;

window.onload = function() {
  show();
  document.getElementById('add').addEventListener('click', add);
  document.getElementById('add').addEventListener('keypress', handleKeyPress);
  document.getElementById('task').addEventListener('keypress', handleKeyPress);
}

function getToDos() {
  var todos = [];
  var todos_str = localStorage.getItem('todo');
  if (todos_str !== null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}

function priority() {
  var index = this.getAttribute('id');
  var todos = getToDos();

  var newArray = todos.filter(function(text) {
    return text != todos[index];
  });
  
  if (todos[index][1] == PRIORITY){
    todos[index][1] = DEFAULT;
    document.getElementById(index).classList.remove("redpriority");
    document.getElementById(index + "delicious").classList.remove("priorty");
    document.getElementById(index + "delicious").classList.add("delicious");
    newArray.push(todos[index]);
  } else {
    todos[index][1] = PRIORITY;
    newArray.unshift(todos[index]);
    document.getElementById(index).classList.add("redpriority");
    document.getElementById(index + "delicious").classList.remove("strike");
    document.getElementById(index + "delicious").classList.add("priority");
  }
  localStorage.setItem('todo', JSON.stringify(newArray));
  show();
}

function done() {
  var index = this.getAttribute('id');
  var todos = getToDos();
  if (todos[index][1] == DONE){
    todos[index][1] = DEFAULT;
    document.getElementById(index + "delicious").classList.remove("strike");
    document.getElementById(index + "delicious").classList.add("delicious");
  } else {
    todos[index][1] = DONE;
    document.getElementById(index + "delicious").classList.remove("priority");
    document.getElementById(index + "delicious").classList.add("strike");
  }
  localStorage.setItem('todo', JSON.stringify(todos));
}

function handleKeyPress(e){
  if (13 == e.keyCode){
    add();
  }
}

function add() {
  var text = document.getElementById('task').value;

  if (text == '') {
    return;
  }

  var task = [text, DEFAULT];
  var todos = getToDos();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();
  document.getElementById('task').value = '';
  return false;
}

function remove() {
  var id = this.getAttribute('id');
  var todos = getToDos();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();

  return false;
}

function show() {
  var todos = getToDos();

  var html = '<ul>';
  for (var i = 0; i < todos.length; i++) {
    var statusclass = "delicious";
    var buttonstatus = "";
    if (todos[i][1] == DONE) {
      statusclass = "strike";
    } else if (todos[i][1] == PRIORITY) {
      statusclass = "priority";
      buttonstatus = "redpriority";
    }
    html += '<li class="' + statusclass + '" id="' + i + 'delicious" value="' + todos[i][0] + '">' + todos[i][0] +
      '<button class="priority ' + buttonstatus + '"  id="' + i + '">!</button>' +
      '<button class="check" id="' + i + '">done</button>' +
      '<button class="remove" id="' + i + '">x</button></li>';
  };
  html += '</ul>';

  document.getElementById('todos').innerHTML = html;

  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', remove);
  };
  buttons = document.getElementsByClassName('check');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', done);
  };
  buttons = document.getElementsByClassName('priority');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', priority);
  };
}
