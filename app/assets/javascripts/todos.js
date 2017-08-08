function Todo(attributes) {
    this.title = attributes.title;
    this.description = attributes.description;
    this.id = attributes.id;
    this.address = attributes.address;
    this.done = attributes.done;
    this.duedate = attributes.duedate;
    this.parent_id = attributes.parent_id;
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

$(document).on('ready', function() {
    $(`/parents/` + response.parent_id + `/todos/` + response.id).on("click", function(e) {
        e.preventDefault()
        $.ajax({
            method: "GET",
            url:
        }).done(function(data) {
            // Get the response

            console.log(data)
                // load the data into dom
        })
        var html = `
            <div class="panel panel-default">

            <div class="panel-heading">
                <h3 class="panel-title">` + response.title + `~ added: ` + response.created_at.strftime('%B %d, %Y').downcase + `</h3>
            </div>

            <div class="panel-body">`

        if (response.address === nil) {
            `no address supplied
            <br>

            <form class="edit_todo" id="edit_todo_` + response.id + `" action="/parents/` + response.parent_id + `/todos/` + response.id + `" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="_method" value="patch" /><input type="hidden" name="authenticity_token" value="xwoBg7pF7NOOAKAY4sbD/1VkVtYUn/B5h8WxTUmzbBpgl2l9A3EQU+vr++7LCbUaOWQrhFdwLxRnpG327KqTcQ==" />
            <label for="todo_address">add an address:</label><br>
            <input placeholder="enter a street address" size="22" type="text" value="" name="todo[address]" id="todo_address" />
            <br>
            <input type="submit" name="commit" value="submit" class="btn btn-primary" data-disable-with="submit" />
            </form>`
        } else {
            `<iframe
            width="200"
            height="150"
            frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCkIkw32ps5odw1KNV7wtdteXOyk1B69RE
            &q=` + response.address + `" allowfullscreen>
            </iframe><br>`
        }

        if (response.description === nil) {
            `<form class="edit_todo" id="edit_todo_` + response.id + `" action="/parents/` + response.parent_id + `/todos/` + response.id `" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="_method" value="patch" /><input type="hidden" name="authenticity_token" value="N4X45J0U0T8Q6YQJNbPimSJMAzgz5YhyF3DIsbr9U5qQGJAaJCAtv3UC3/8cfJR8Tkx+anAKVx/3ERQKH+Ss8Q==" />
            <label for="todo_description">add some info</label>
            <br>
            <textarea name="todo[description]" id="todo_description">
            </textarea>
            <br>
            <input type="submit" name="commit" value="add description" class="btn btn-primary" data-disable-with="add description" />
            </form>`
        } else {
            `<h4>some info:</h4>` +
            response.description + `<br><br>`
        }

        `<form class = "edit_todo" id = "edit_todo_` + response.id + `" action = "/parents/` + response.parent_id + `/todos/` + response.id + `" accept - charset = "UTF-8" method = "post" > <input name = "utf8" type = "hidden" value = "&#x2713;" / > <input type = "hidden" name = "_method" value = "patch" / > <input type = "hidden" name = "authenticity_token"
        value = "gpvPjQjiLvhTd7oKWCLIA6t829WHsYIUharXhxoiyd8lBqdzsdbSeDac4fxx7b7mx3ymh8ReXXllyws8vzs2tA==" / >
        <label for = "todo_duedate" > needs to get done by ? </label> <br>
        <input type = "date" name = "todo[duedate]" id = "todo_duedate" / >
        <br>
        <input type = "submit" name = "commit" value = "add due date" class = "btn btn-primary" data-disable-with = "add due date" / >
        </form> <br><br>`

        `<h4>what do you need to do?</h4>
        <form class="new_task" id="new_task" action="/parents/` + response.parent_id + `/todos/` + response.id + `/tasks" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="+AwiRMu2C6VMi+W2JtKgeQkeWLR1LQMFwG+HmYWHRDBU6YAIbMVljeuRYcJC7bpaKrTE/1490FnpzhJ8iRZlCQ==" />
        <input placeholder="what needs to get done?" size="22" type="text" name="task[title]" id="task_title" />
        <input value="` + response.parent_id + `" type="hidden" name="task[parent_id]" id="task_parent_id" />
        <input value="` + response.id + `" type="hidden" name="task[todo_id]" id="task_todo_id" />
        <input type="submit" name="commit" value="add task" class="btn btn-primary btn-sm" data-disable-with="add task" />
        </form><br>`

        `<h4>are you done?</h4>
        <form class="edit_todo" id="edit_todo_` + response.id + `" action="/parents/` + response.parent_id + `/todos/` + response.id `" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="_method" value="patch" /><input type="hidden" name="authenticity_token" value="pYtZNgF28DIfp2DSvpHV6bmLFazfZ3EQkLO5P5I+okYCFjHIuEIMsnpMOySXXqMM1Yto/pyIrn1w0mWENyddLQ==" />
        <label for="todo_yes">Yes?</label>
        <input type="radio" value="true" name="todo[done]" id="todo_done_true" />
        <label for="todo_no">No?</label>
        <input type="radio" value="false" checked="checked" name="todo[done]" id="todo_done_false" />
        <br>
        <input type="submit" name="commit" value="mark done" class="btn btn-primary" data-disable-with="mark done" />
        </form>
        </div>

        <div class = "panel-body" >
        <a href="/parents/` + response.parent_id + `">return to your todos</a>
        <br>
        <a href="/logout">logout</a>
        </div>`

        html.render();
    })
})