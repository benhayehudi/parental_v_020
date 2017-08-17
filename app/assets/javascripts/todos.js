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
function renderTodoPage() {
    $('div.todo-content').html("");
    $('div.panel-heading').html("");
    $('div.panel-heading').html(headerHTML);
    $("div.todo-address").css("display", "block");
    $("div.todo-address").prepend(addressHTML);
    $("div.todo-description").css("display", "block");
    $("div.todo-description").prepend(descriptionHTML);
    $("div.todo-duedate").css("display", "block");
    $("div.todo-duedate").prepend(duedateHTML);
    $("div.todo-addtask").css("display", "block");
    $("div.todo-addtask").prepend(addtaskHTML);
    $("div.todo-taskdone").css("display", "block");
    $("div.todo-taskdone").prepend(taskdoneHTML);
    $("div.todo-done").css("display", "block");
    $("div.todo-done").prepend(tododoneHTML);
    $("input[type=submit]").removeAttr("disabled");
}

function renderParentPage() {
    $('div.todo-content').html("");
    $('div.panel-heading').html("");
    $('div.panel-heading').html(headerHTML);
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

    TodoApiService.updateTodo(action, params, renderTodoPage);
})

$("#description-form").on("submit", function(e) {
    e.preventDefault()
    var action = $(this).attr("action");
    var params = $(this).serialize();

    TodoApiService.updateTodo(action, params, renderTodoPage);
})

$("#duedate-form").on("submit", function(e) {
    e.preventDefault()
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();

    TodoApiService.updateTodo(action, params, renderTodoPage)
})

$("#addtask-form").on("submit", function(e) {
    e.preventDefault()
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();

    TodoApiService.updateTodo(action, params, renderTodoPage)
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

    TodoApiService.newTodo(action, params, renderParentPage)
})


// API SERVICE 
const TodoApiService = {

    updateTodo(action, params, callback) {
        $.post(action, params)
            .success(response => callback());
    }

    newTodo(action, params, callback) {
        $.post(action, params)
            .success(response => callback());
    }
}

Todo.prototype.submitForm = function() {



$(function() {


    $.post(action, params)
        .success(response => $("#todo-list").prepend(
            `<div id="todoid-` + response.id + `"><strong><a href="/parents/` + response.parent_id + `/todos/` + response.id + `"` + `class="todo-id-` + response.id + `">` + response.title + `</a></strong><br></div>`))
        .success(response => $("input[type=submit]").removeAttr("disabled"))
        .error(Todo.error)
})
})

$(document).on('ready', function(e) {
    $('a.load_todo').on("click", function(e) {
        e.preventDefault()
        var todoId = parseInt(this.dataset.todoid)
        var parentId = parseInt(this.dataset.parentid)
        $.get("/parents/" + parentId + "/todos/" + todoId).success(function(json) {
            var taskdoneHTML = ''
            var addtaskHTML = ''
            var headerHTML = `<h3 class="panel-title">${json.title}</h3>`
            var addressHTML = `<div class="panel-body">`
            if (json.address == null || json.address == "") {
                addressHTML += `no address supplied<br>`
            } else {
                addressHTML += `<iframe width="200" height="150" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCkIkw32ps5odw1KNV7wtdteXOyk1B69RE &q=${json.address}" allowfullscreen> </iframe>`
            }
            if (json.description == null) {
                var descriptionHTML = ``
            } else {
                var descriptionHTML = `<h4>some info:</h4>`
                descriptionHTML += json.description
            }
            descriptionHTML += `<br><br>`
            var duedateHTML = `<h4>what do you need to do?</h4>`
            if (!json.tasks) {
                addtaskHTML += `no tasks for this todo yet`
            } else {
                json.tasks.forEach(function(task) {
                    if (task.done == false) {
                        taskdoneHTML += `${task.title}<br>`
                    } else {
                        taskdoneHTML = ''
                    }
                })
            }

            var tododoneHTML = `<h4>are you done?</h4>`

            $('div.todo-content').html("")

            $('div.panel-heading').html("")
            $('div.panel-heading').html(headerHTML)

            $("div.todo-address").css("display", "block");
            $("div.todo-address").prepend(addressHTML)

            $("div.todo-description").css("display", "block");
            $("div.todo-description").prepend(descriptionHTML)

            $("div.todo-duedate").css("display", "block");
            $("div.todo-duedate").prepend(duedateHTML)

            $("div.todo-addtask").css("display", "block");
            $("div.todo-addtask").prepend(addtaskHTML)

            $("div.todo-taskdone").css("display", "block");
            $("div.todo-taskdone").prepend(taskdoneHTML)

            $("div.todo-done").css("display", "block");
            $("div.todo-done").prepend(tododoneHTML)

            const todo = new Todo(json)
            $('#todos-list').append(todo.renderTodoCard());
            t.submitForm();
        });
    })
})

Todo.prototype.getAddressString = function() {
    if (this.address == null || this.address == "") {
        return `no address supplied<br>`;
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

Todo.prototype.renderTodoCard = function() {
    const addressString = this.getAddressString()
    const descriptionString = this.getDecriptionString()

    return (`
        <div>
            <h1>${this.name}</h1>
            <p>${descriptionString}</p>
            <p>${addressString}</p>
        </div>
    `);
}