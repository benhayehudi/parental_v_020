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

$(function() {
    $("form#new_todo").on("submit", function(e) {
        e.preventDefault()
        var $form = $(this);
        var action = $form.attr("action");
        var params = $form.serialize();

        $.post(action, params)
            .success(response => $("#todo-list").prepend(`<strong><a href="/parents/` + response.parent_id + `/todos/` + response.id + `">` +
                response.title + `</a></strong><br>`))
            .success(response => $("input[type=submit]").removeAttr("disabled"))
            .error(Todo.error)
    })
})

$(document).on('ready', function() {

})