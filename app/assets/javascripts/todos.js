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

    updateTodo(action, params, callback) {
        $.post('#{:controller => "todos_controller", :action => "show"}', action, params)
            .success($('div.todo-content').empty())
            .then(response => callback());
    },

    newTodo(action, params, callback) {
        $.post(action, params)
            .success(response => callback());
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
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCkIkw32ps5odw1KNV7wtdteXOyk1B69RE&q=${this.address}" allowfullscreen
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
    if (!todo.tasks) {
        return `no tasks for this todo yet`;
    } else {
        Array.from(todo.tasks).forEach(function(task) {
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
        <div id="todoid-${this.id}">
            <strong>
                <a href="/parents/${this.parent_id}/todos/${this.id}" 
                class="todo-id-${this.id}">${this.title}
                </a>
            </strong>
            <br>
        </div>
    `);
}