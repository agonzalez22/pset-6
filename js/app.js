window.onload = function(){
  show();
}
function reload(){
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
  var id = this.getAttribute('id');
  var todos = get_todos();

  var newArray = todos.filter(function(text) {
    return text != todos[id];
  });

  newArray.unshift(todos[id]);
  localStorage.setItem('todo', JSON.stringify(newArray));
  //todos.unshift(todos[id]);

  show();
}

function done (){
  var id = this.getAttribute('id');
  document.getElementById(id+"delicious").classList.add("strike");
}

function add() {
  var task = document.getElementById('task').value;

  if (task == '') {
    return;
  }

  var todos = get_todos();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));

  reload();
  show();

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
      html += '<li class="delicious" id="' + i + 'delicious" value="' + todos[i] + '">'  + todos[i] +
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
document.getElementById('add').addEventListener('click', add);
show();
