class Todo {
    constructor(id, parent_id, title, description, address, done, duedate, tasks) {
        this.title = title
        this.description = description
        this.id = id
        this.address = address
        this.done = done
        this.duedate = duedate
        this.parent_id = parent_id
        this.tasks = tasks
    }
}

// DOM Manipulation Functions
function renderTodoCard(todo) {
    $('div.todo-content').html("");
    $('div.panel-heading').html("");
    $('div.panel-heading').html(todo.getHeaderString(todo));
    $("div.todo-address").css("display", "block");
    $("div.todo-address").prepend(todo.getAddressString(todo));
    $("div.todo-description").css("display", "block");
    $("div.todo-description").prepend(todo.getDescriptionString(todo));
    $("div.todo-duedate").css("display", "block");
    $("div.todo-duedate").prepend(todo.getDueDateString(todo));
    $("div.todo-addtask").css("display", "block");
    $("div.todo-addtask").prepend(todo.getTasksString(todo));
    $("div.todo-done").css("display", "block");
    $("div.todo-done").prepend(todo.getTodoDoneString(todo));
    $("input[type=submit]").removeAttr("disabled");
}

function renderParentPage(todo) {
    $('div.todo-list').append(todo.renderTodoListing(todo));
    $("div.todo-address").css("display", "hide");
    $("div.todo-description").css("display", "hide");
    $("div.todo-duedate").css("display", "hide");
    $("div.todo-addtask").css("display", "hide");
    $("div.todo-taskdone").css("display", "hide");
    $("div.todo-done").css("display", "hide");
    $("input[type=submit]").removeAttr("disabled")
}

// Event Listeners 
$(document).ready(function() {
    $("form#new_todo").on("submit", function(e) {
        e.preventDefault()
        var action = $(this).attr("action");
        var params = $(this).serialize();

        TodoApiService.newTodo(action, params, renderParentPage);
    })

    $('a.load_todo').on("click", function(e) {
        e.preventDefault()
        const parentId = this.dataset.parentid
        const todoId = this.dataset.todoid

        TodoApiService.loadTodo(parentId, todoId, renderTodoCard);
    })
})


// API SERVICE 
const TodoApiService = {
    newTodo(action, params, callback) {
        $.post(action, params, function(todo) {
            var todo = new Todo(
                todo.todo_id = todo.id,
                todo.parent_id = todo.parent_id,
                todo.title = todo.title,
                todo.description = todo.description,
                todo.address = todo.address,
                todo.done = todo.done,
                todo.duedate = todo.duedate,
                todo.tasks = todo.tasks
            )
            renderParentPage(todo);
        })
    },

    loadTodo(parentId, todoId, callback) {
        $.get("/parents/" + (parentId) + "/todos/" + (todoId), function(todo) {
            var todo = new Todo(
                todo.todo_id = todoId,
                todo.parent_id = parentId,
                todo.title,
                todo.description,
                todo.address,
                todo.done,
                todo.duedate,
                todo.tasks
            )
            renderTodoCard(todo);
        })
    }
}


// Todo.prototype Functions
Todo.prototype.getHeaderString = function(todo) {
    return `<h3 class="panel-title">${todo.title}</h3>`;
}

Todo.prototype.getDueDateString = function(todo) {
    return `<h4>what do you need to do?</h4>`;
}

Todo.prototype.getTodoDoneString = function(todo) {
    return `<h4>are you done?</h4>`;
}

Todo.prototype.getAddressString = function(todo) {
    if (todo.address == null || todo.address == "") {
        return (`
        <div class="panel-body">
        no address supplied<br>
        `);
    }
    return (`
        <iframe 
            width="200" 
            height="150" 
            frameborder="0" 
            style="border:0" 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCkIkw32ps5odw1KNV7wtdteXOyk1B69RE&q=${todo.address}" allowfullscreen
        />
    `);
}

Todo.prototype.getDescriptionString = function(todo) {
    if (todo.description == null) {
        return '';
    }
    return (`
        <h4>some info:</h4>
        ${todo.description}
        <br><br>
    `);
}

Todo.prototype.getTasksString = function(todo) {
    var nestedTitle = todo.tasks.map(task => task.title)
    return (`
        <h4>your tasks</h4>
        ${nestedTitle.toString()}
        `)

}

Todo.prototype.renderTodoListing = function(todo) {
    return (` 
        <div id = "todoid-${todo.id}" >
            <strong>
                <a href = "/parents/${todo.parent_id}/todos/${todo.id}"
                class = "todo-id-${todo.id}" > $ { todo.title } <
                /a> 
            </strong> 
            <br />
        </div>
    `);
}