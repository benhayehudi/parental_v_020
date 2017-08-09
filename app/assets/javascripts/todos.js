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
            debugger
            var headerHTML = `<h3 class="panel-title">${json.title} ~ added: ${json.created_at}</h3>`
            var newHTML = `<div class="panel-body">`
            if (json.address == null || json.address == "") {
                newHTML += `no address supplied<br>`
                newHTML += `<form class="edit_todo" id="edit_todo+${json.id}" action="/parents/${json.parent_id}/todos/${json.id}" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="_method" value="patch" /><input type="hidden" name="authenticity_token" value="N4X45J0U0T8Q6YQJNbPimSJMAzgz5YhyF3DIsbr9U5qQGJAaJCAtv3UC3/8cfJR8Tkx+anAKVx/3ERQKH+Ss8Q==" /><label for="todo_address">add an address</label><br><input type="text" name="todo[address] size="22" id="todo_address" /><br><input type="submit" name="commit" value="add address" class="btn btn-primary" data-disable-with="add due date" /></form><br><br>`
            } else {
                newHTML += `<iframe width="200" height="150" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCkIkw32ps5odw1KNV7wtdteXOyk1B69RE &q=${json.address}" allowfullscreen> </iframe>`
            }
            if (json.description == null) {
                newHTML += `<form class="edit_todo" id="edit_todo_${json.id}" action="/parents/${json.parent_id}/todos/${json.id}" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="_method" value="patch" /><input type="hidden" name="authenticity_token" value="N4X45J0U0T8Q6YQJNbPimSJMAzgz5YhyF3DIsbr9U5qQGJAaJCAtv3UC3/8cfJR8Tkx+anAKVx/3ERQKH+Ss8Q==" /><label for="todo_description">add some info</label><br><textarea name="todo[description]" id="todo_description"></textarea><br><input type="submit" name="commit" value="add description" class="btn btn-primary" data-disable-with="add description" /></form>`
            } else {
                newHTML += `<h4>some info:</h4>`
                newHTML += json.description
            }
            newHTML += `<br><br>`
            newHTML += `<form class = "edit_todo" id = "edit_todo_${json.id}" action = "/parents/${json.parent_id}/todos/${json.id}" accept-charset = "UTF-8" method = "post" > <input name = "utf8" type = "hidden" value = "&#x2713;" / > <input type = "hidden" name = "_method" value = "patch" / > <input type = "hidden" name = "authenticity_token" value = "gpvPjQjiLvhTd7oKWCLIA6t829WHsYIUharXhxoiyd8lBqdzsdbSeDac4fxx7b7mx3ymh8ReXXllyws8vzs2tA==" / ><label for = "todo_duedate" >needs to get done by ?</label><br><input type = "date" name = "todo[duedate]" id = "todo_duedate" /><br><input type = "submit" name = "commit" value = "add due date" class = "btn btn-primary" data-disable-with = "add due date" / ></form> <br><br>`
            newHTML += `<h4>what do you need to do?</h4>`
            newHTML += `<form class="new_task" id="new_task" action="/parents/${json.parent_id}/todos/${json.id}/tasks" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="+AwiRMu2C6VMi+W2JtKgeQkeWLR1LQMFwG+HmYWHRDBU6YAIbMVljeuRYcJC7bpaKrTE/1490FnpzhJ8iRZlCQ==" /><input placeholder="what needs to get done?" size="22" type="text" name="task[title]" id="task_title" /><input value="${json.parent_id}" type="hidden" name="task[parent_id]" id="task_parent_id" /><input value="${json.id}" type="hidden" name="task[todo_id]" id="task_todo_id" /><input type="submit" name="commit" value="add task" class="btn btn-primary btn-sm" data-disable-with="add task" /></form><br>`
            newHTML += `<h4>are you done?</h4>`
            newHTML += `<form class="edit_todo" id="edit_todo_${json.id}" action="/parents/${json.parent_id}/todos/${json.id}" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="_method" value="patch" /><input type="hidden" name="authenticity_token" value="pYtZNgF28DIfp2DSvpHV6bmLFazfZ3EQkLO5P5I+okYCFjHIuEIMsnpMOySXXqMM1Yto/pyIrn1w0mWENyddLQ==" /><label for="todo_yes">Yes?</label><input type="radio" value="true" name="todo[done]" id="todo_done_true" /><label for="todo_no">No?</label><input type="radio" value="false" checked="checked" name="todo[done]" id="todo_done_false" /><br><input type="submit" name="commit" value="mark done" class="btn btn-primary" data-disable-with="mark done" /></form>`
            newHTML += `</div>`
            newHTML += `<div class = "panel-body" >`
            newHTML += `<a href="/parents/${json.parent_id}">return to your todos</a>`
            newHTML += `<br>`
            newHTML += `<a href="/logout">logout</a></div>`


            $('div.panel-heading').html("")
            $('div.panel-heading').html(headerHTML)
            $('div.todo-content').html("")
            $("div.todo-content").html(newHTML)
        });
    })
})