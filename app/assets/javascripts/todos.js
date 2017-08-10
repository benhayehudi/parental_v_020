var headerHTML;
var addressHTML;
var descriptionHTML;
var duedateHTML;
var addtaskHTML;
var taskdoneHTML;
var tododoneHTML;

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


Todo.error = function(response) {
    alert("Please enter a valid todo.", response)
}

Todo.prototype.submitForm = function() {
    $("#address-form").on("submit", function(e) {
        e.preventDefault()
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();

        $.post(action, params)
            .success(response => $('div.todo-content').html(""))
            .success(response => $('div.panel-heading').html(""))
            .success(response => $('div.panel-heading').html(headerHTML))
            .success(response => $("div.todo-address").css("display", "block"))
            .success(response => $("div.todo-address").prepend(addressHTML))
            .success(response => $("div.todo-description").css("display", "block"))
            .success(response => $("div.todo-description").prepend(descriptionHTML))
            .success(response => $("div.todo-duedate").css("display", "block"))
            .success(response => $("div.todo-duedate").prepend(duedateHTML))
            .success(response => $("div.todo-addtask").css("display", "block"))
            .success(response => $("div.todo-addtask").prepend(addtaskHTML))
            .success(response => $("div.todo-taskdone").css("display", "block"))
            .success(response => $("div.todo-taskdone").prepend(taskdoneHTML))
            .success(response => $("div.todo-done").css("display", "block"))
            .success(response => $("div.todo-done").prepend(tododoneHTML))
            .success(response => $("input[type=submit]").removeAttr("disabled"))
    })
    $("#description-form").on("submit", function(e) {
        e.preventDefault()
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();

        $.post(action, params)
            .success(response => $('div.todo-content').html(""))
            .success(response => $('div.panel-heading').html(""))
            .success(response => $('div.panel-heading').html(headerHTML))
            .success(response => $("div.todo-address").css("display", "block"))
            .success(response => $("div.todo-address").prepend(addressHTML))
            .success(response => $("div.todo-description").css("display", "block"))
            .success(response => $("div.todo-description").prepend(descriptionHTML))
            .success(response => $("div.todo-duedate").css("display", "block"))
            .success(response => $("div.todo-duedate").prepend(duedateHTML))
            .success(response => $("div.todo-addtask").css("display", "block"))
            .success(response => $("div.todo-addtask").prepend(addtaskHTML))
            .success(response => $("div.todo-taskdone").css("display", "block"))
            .success(response => $("div.todo-taskdone").prepend(taskdoneHTML))
            .success(response => $("div.todo-done").css("display", "block"))
            .success(response => $("div.todo-done").prepend(tododoneHTML))
            .success(response => $("input[type=submit]").removeAttr("disabled"))

    })
    $("#duedate-form").on("submit", function(e) {
        e.preventDefault()
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();

        $.post(action, params)
            .success(response => $('div.todo-content').html(""))
            .success(response => $('div.panel-heading').html(""))
            .success(response => $('div.panel-heading').html(headerHTML))
            .success(response => $("div.todo-address").css("display", "block"))
            .success(response => $("div.todo-address").prepend(addressHTML))
            .success(response => $("div.todo-description").css("display", "block"))
            .success(response => $("div.todo-description").prepend(descriptionHTML))
            .success(response => $("div.todo-duedate").css("display", "block"))
            .success(response => $("div.todo-duedate").prepend(duedateHTML))
            .success(response => $("div.todo-addtask").css("display", "block"))
            .success(response => $("div.todo-addtask").prepend(addtaskHTML))
            .success(response => $("div.todo-taskdone").css("display", "block"))
            .success(response => $("div.todo-taskdone").prepend(taskdoneHTML))
            .success(response => $("div.todo-done").css("display", "block"))
            .success(response => $("div.todo-done").prepend(tododoneHTML))
            .success(response => $("input[type=submit]").removeAttr("disabled"))
    })

    $("#addtask-form").on("submit", function(e) {
        e.preventDefault()
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();

        $.post(action, params)
            .success(response => $('div.todo-content').html(""))
            .success(response => $('div.panel-heading').html(""))
            .success(response => $('div.panel-heading').html(headerHTML))
            .success(response => $("div.todo-address").css("display", "block"))
            .success(response => $("div.todo-address").prepend(addressHTML))
            .success(response => $("div.todo-description").css("display", "block"))
            .success(response => $("div.todo-description").prepend(descriptionHTML))
            .success(response => $("div.todo-duedate").css("display", "block"))
            .success(response => $("div.todo-duedate").prepend(duedateHTML))
            .success(response => $("div.todo-addtask").css("display", "block"))
            .success(response => $("div.todo-addtask").prepend(addtaskHTML))
            .success(response => $("div.todo-taskdone").css("display", "block"))
            .success(response => $("div.todo-taskdone").prepend(taskdoneHTML))
            .success(response => $("div.todo-done").css("display", "block"))
            .success(response => $("div.todo-done").prepend(tododoneHTML))
            .success(response => $("input[type=submit]").removeAttr("disabled"))
    })
    $("#tododone-form").on("submit", function(e) {
        e.preventDefault()
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();

        $.post(action, params)
            .success(response => $('div.todo-content').html(""))
            .success(response => $('div.panel-heading').html(""))
            .success(response => $('div.panel-heading').html(headerHTML))
            .success(response => $("div.todo-address").css("display", "hide"))
            .success(response => $("div.todo-address").prepend(addressHTML))
            .success(response => $("div.todo-description").css("display", "hide"))
            .success(response => $("div.todo-description").prepend(descriptionHTML))
            .success(response => $("div.todo-duedate").css("display", "hide"))
            .success(response => $("div.todo-duedate").prepend(duedateHTML))
            .success(response => $("div.todo-addtask").css("display", "hide"))
            .success(response => $("div.todo-addtask").prepend(addtaskHTML))
            .success(response => $("div.todo-taskdone").css("display", "hide"))
            .success(response => $("div.todo-taskdone").prepend(taskdoneHTML))
            .success(response => $("div.todo-done").css("display", "hide"))
            .success(response => $("div.todo-done").prepend(tododoneHTML))
        location.reload();

    })
}

$(function() {
    $("form#new_todo").on("submit", function(e) {
        e.preventDefault()
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();

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

            t = new Todo({
                id: json.id,
                parent_id: json.parent_id,
                description: json.description,
                done: json.done,
                duedate: json.duedate,
                title: json.title,
                tasks: json.tasks,
                address: json.address
            })
            t.submitForm();
        });
    })
})