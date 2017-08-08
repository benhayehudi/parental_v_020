// function Todo(todo) {
//     this.id = todo.id;
//     this.title = todo.title;
//     this.description = todo.description;
//     this.done = todo.done;
//     this.address = todo.address;
//     this.duedate = todo.duedate;
//     this.parent_id = todo.parent_id;
// }

// Todo.prototype.renderTodoItem = function() {
//     return Todo.todoListTemplate(this)
// }

// $(document).ready(function() {
//     Todo.todoListSource = $("#main-todo-list").html();
//     Todo.todoListTemplate = Handlebars.compile(Todo.todoListSource);
//     Todo.renderTodoItem();
// });