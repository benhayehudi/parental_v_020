// Remove Globals 
// Use TodoApiService
// Seperation of Concerns in your event listeners
// Use prototype functions correctly for when you need access to the constructors (this) attributes
// Use template literals `${}`
// No Repeated Code

class Todo {
    constructor(attributes) {
        for (var key in attributes) {
            this[key] = attributes[key];
        }
    }
}

Todo.error = function(response) {
    alert("Please enter a valid todo.", response)
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
}

// Event Listeners 
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
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();

    TodoApiService.updateTodo(action, params, renderTodoCard)
})

$("#addtask-form").on("submit", function(e) {
    e.preventDefault()
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();

    TodoApiService.updateTodo(action, params, renderTodoCard)
})

$("#tododone-form").on("submit", function(e) {
    e.preventDefault()
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();

    TodoApiService.updateTodo(action, params, renderParentPage)
})

$("form#new_todo").on("submit", function(e) {
    e.preventDefault()
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    $("input[type=submit]").removeAttr("disabled")

    TodoApiService.newTodo(action, params, renderParentPage)
})

$('a.load_todo').on("click", function(e) {
    e.preventDefault()
    var todoId = parseInt(this.dataset.todoid)
    var parentId = parseInt(this.dataset.parentid)

    TodoApiService.loadTodo(action, params, renderTodoCard)
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

    loadTodo(action, params, callback) {
        $.get("/parents/" + parentId + "/todos/" + todoId)
            .success(response => callback());
    }
}

// Todo.prototype Functions
Todo.prototype.getHeaderString = function() {
    return `<h3 class="panel-title">${json.title}</h3>`;
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
        <h4>some info:</h4><br>` +
        this.description

        `<br><br>
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

// Todo.prototype render DOM elements functions
Todo.prototype.renderTodoListing = function() {
    return (`
        <div id="todoid-` + response.id + `">
            <strong>
                <a href="/parents/` +
        response.parent_id +
        `/todos/` +
        response.id +
        `"` +
        `class="todo-id-` +
        response.id +
        `">` +
        response.title +
        `</a>
            </strong>
            <br>
        </div>
    `);
}

// Todo.prototype.renderTodoCard = function() {
//     const headerString = this.getHeaderString()
//     const addressString = this.getAddressString()
//     const descriptionString = this.getDecriptionString()
//     const tasksString = this.getTasksString()
//     const duedateString = this.getDueDateString()
//     const tododoneString = this.getTodoDoneString()

//     return (`
//         <div>
//             <h1>${this.name}</h1>
//             <p>${descriptionString}</p>
//             <p>${addressString}</p>
//         </div>
//     `);
// }