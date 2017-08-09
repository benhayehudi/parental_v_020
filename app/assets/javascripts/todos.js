function Todo(attributes) {
    this.title = attributes.title;
    this.description = attributes.description;
    this.id = attributes.id;
    this.address = attributes.address;
    this.done = attributes.done;
    this.duedate = attributes.duedate;
    this.parent_id = attributes.parent_id;
    this.created_at = attributes.created_at;
}

Todo.error = function(response) {
    alert("Please enter a valid todo.", response)
}

Todo.prototype.renderIndex = function() {

    `<strong><a href="/parents/` + response.parent_id + `/todos/` + response.id + `"` + `class="todo-id-` + response.id + `"> ` +
        response.title + ` < /a></strong > < br > `
}

$(function() {
    $("form#new_todo").on("submit", function(e) {
        e.preventDefault()
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();
        var todoIndex = Todo.new

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
        $.get(this.href).success(function(json) {
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
            if (json.tasks == null || json.tasks == "") {
                var addtaskHTML = `no tasks for this todo yet`
            } else {
                json.tasks.forEach(function(task) {
                    if (task.done == false && task.title !== null) {
                        var taskdoneHTML = `${task.title} ~ <em>done?</em>`
                    } else {
                        var taskdoneHTML = ''
                    }
                })
            }

            var tododoneHTML = `<h4>are you done?</h4>`
            tododoneHTML += `</div>`
            tododoneHTML += `<div class = "panel-body" >`
            tododoneHTML += `<a href="/parents/${json.parent_id}">return to your todos</a>`
            tododoneHTML += `<br>`
            tododoneHTML += `<a href="/logout">logout</a></div>`


            $('div.panel-heading').html("")
            $('div.panel-heading').html(headerHTML)
            $("div.todo-address").prepend(addressHTML)
            $("div.todo-description").prepend(descriptionHTML)
            $("div.todo-duedate").prepend(duedateHTML)
            $("div.todo-addtask").prepend(addtaskHTML)
            $("div.todo-taskdone").prepend(taskdoneHTML)
            $("div.todo-todoone").prepend(tododoneHTML)
        });
    })
})