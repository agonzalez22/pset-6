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

function reload() {
  location.reload(true);
}

function get_todos() {
  var todos = [];
  var todos_str = localStorage.getItem('todo');
  if (todos_str !== null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}

function priority() {
  var index = this.getAttribute('id');
  var todos = get_todos();

  var newArray = todos.filter(function(text) {
    return text != todos[index];
  });
  todos[index][1] = PRIORITY;
  newArray.unshift(todos[index]);
  localStorage.setItem('todo', JSON.stringify(newArray));

  document.getElementById(index + "delicious").classList.remove("strike");
  document.getElementById(index + "delicious").classList.add("priority");
  show();
}

function done() {
  var index = this.getAttribute('id');
  var todos = get_todos();
  todos[index][1] = DONE;
  localStorage.setItem('todo', JSON.stringify(todos));

  document.getElementById(index + "delicious").classList.remove("priority");
  document.getElementById(index + "delicious").classList.add("strike");
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
  var todos = get_todos();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();
  document.getElementById('task').value = '';
  return false;
}

function remove() {
  var id = this.getAttribute('id');
  var todos = get_todos();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();

  return false;
}

function show() {
  var todos = get_todos();

  var html = '<ul>';
  for (var i = 0; i < todos.length; i++) {
    var statusclass = "delicious";
    if (todos[i][1] == DONE) {
      statusclass = "strike";
    } else if (todos[i][1] == PRIORITY) {
      statusclass = "priority";
    }
    html += '<li class="' + statusclass + '" id="' + i + 'delicious" value="' + todos[i][0] + '">' + todos[i][0] +
      '<button class="priority" id="' + i + '">!</button>' +
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
