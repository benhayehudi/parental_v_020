desc "This task is called by the Heroku scheduler add-on"

task :send_reminders => :environment do
  @todos = Todo.all
  @todos.each do |todo|
    if todo.duedate == Date.today || todo.duedate == Date.tomorrow && todo.done == false
      UserMailer.reminder_email.deliver
    end
  end
end
