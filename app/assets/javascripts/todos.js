// Remove Globals 
// Use TodoApiService
// Seperation of Concerns in your event listeners
// Use prototype functions correctly for when you need access to the constructors (this) attributes
// Use template literals `${}`
// No Repeated Code

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
function renderTodoCard() {
    $('div.todo-content').html("");
    $('div.panel-heading').html("");
    $('div.panel-heading').html(todo.getHeaderString());
    $("div.todo-address").css("display", "block");
    $("div.todo-address").prepend(todo.getAddressString());
    $("div.todo-description").css("display", "block");
    $("div.todo-description").prepend(todo.getDescriptionString());
    $("div.todo-duedate").css("display", "block");
    $("div.todo-duedate").prepend(todo.getDueDateString());
    $("div.todo-addtask").css("display", "block");
    $("div.todo-addtask").prepend(todo.getAddTaskString());
    $("div.todo-taskdone").css("display", "block");
    $("div.todo-taskdone").prepend(todo.getTaskDoneString());
    $("div.todo-done").css("display", "block");
    $("div.todo-done").prepend(todo.getTodoDoneString());
    $("input[type=submit]").removeAttr("disabled");
}

function renderParentPage() {
    $('div.todo-list').append(todo.renderTodoListing());
    $('div.panel-heading').html("");
    $('div.panel-heading').html(todo.getHeaderString());
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
    $("#address-form").on("submit", function(e) {
        e.preventDefault()
        var action = $(this).attr("action");
        var params = $(this).serialize();

        TodoApiService.updateTodo(action, params, renderTodoCard);
    })

    $("#description-form").on("submit", function(e) {
        e.preventDefault()
        var action = $(this).attr("action");
        var params = $(this).serialize();

        TodoApiService.updateTodo(action, params, renderTodoCard);
    })

    $("#duedate-form").on("submit", function(e) {
        e.preventDefault()
        var action = $(this).attr("action");
        var params = $(this).serialize();

        TodoApiService.updateTodo(action, params, renderTodoCard)
    })

    $("#addtask-form").on("submit", function(e) {
        e.preventDefault()
        var action = $(this).attr("action");
        var params = $(this).serialize();

        TodoApiService.updateTodo(action, params, renderTodoCard)
    })

    $("#tododone-form").on("submit", function(e) {
        e.preventDefault()
        var action = $(this).attr("action");
        var params = $(this).serialize();

        TodoApiService.updateTodo(action, params, renderParentPage)
    })

    $("form#new_todo").on("submit", function(e) {
        e.preventDefault()
        var action = $(this).attr("action");
        var params = $(this).serialize();
        todo = new Todo();
        todo.title = $('input[name="todo[title]"').val();
        todo.address = $('input[name="todo[address]"').val();
        todo.tasks = $('input[name="todo[tasks_attributes][0][title]"').val();

        TodoApiService.newTodo(action, params, renderParentPage)
    })

    $('a.load_todo').on("click", function(e) {
        e.preventDefault()
        window.todoId = parseInt(this.dataset.todoid)
        window.parentId = parseInt(this.dataset.parentid)
        todo = new Todo();
        todo.id = window.todoId;
        todo.parent_id = window.parentId;

        TodoApiService.loadTodo(todo)
    })
})


// API SERVICE 
const TodoApiService = {

    updateTodo(action, params, callback) {
        $.post(action, params)
            .success(response => callback());
    },

    newTodo(action, params, callback) {
        $.post(action, params)
            .success(response => callback());
    },

    loadTodo(todo) {
        $.get("/parents/" + window.parentId + "/todos/" + window.todoId)
            .success(response => [
                response.tasks = todo.tasks,
                response.description = todo.description,
                response.duedate = todo.duedate,
                response.address = todo.address,
                response.done = todo.done,
                response.id = todo.id,
                response.parent_id = todo.parent_id
            ])
            .then(response => console.log(response))
            .then(response => renderTodoCard())
    }
}

// Todo.prototype Functions
Todo.prototype.getHeaderString = function() {
    return `<h3 class="panel-title">${this.title}</h3>`;
}

Todo.prototype.getDueDateString = function() {
    return `<h4>what do you need to do?</h4>`;
}

Todo.prototype.getTodoDoneString = function() {
    return `<h4>are you done?</h4>`;
}

Todo.prototype.getAddressString = function() {
    if (this.address == null || this.address == "") {
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
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCkIkw32ps5odw1KNV7wtdteXOyk1B69RE&q=${this.address}" allowfullscreen
        />
    `);
}

Todo.prototype.getDescriptionString = function() {
    if (this.description == null) {
        return '';
    }
    return (`
        <h4>some info:</h4>
        ${this.description}
        <br><br>
    `);
}

Todo.prototype.getTasksString = function() {
    if (!this.tasks) {
        return `no tasks for this todo yet`;
    } else {
        this.tasks.forEach(function(task) {
            if (task.done == false) {
                return `${task.title}<br>`;
            } else {
                return '';
            }
        })
    }
}

Todo.prototype.renderTodoListing = function() {
    return (`
        <div id="todoid-` + this.id + `">
            <strong>
                <a href="/parents/` +
        this.parent_id +
        `/todos/` +
        this.id +
        `"` +
        `class="todo-id-` +
        this.id +
        `">` +
        this.title +
        `</a>
            </strong>
            <br>
        </div>
    `);
}