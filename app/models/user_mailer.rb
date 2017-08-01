class UserMailer < ActionMailer::Base
  default :from => "noreply@parental.bengreenberg.org"

  def reminder_email
    @todos = Todo.all
    @todos.each do |todo|
      if todo.duedate == Date.today || todo.duedate == Date.tomorrow && todo.done == false
        mail(:to => "#{todo.parent.name} <#{todo.parent.email}>", :subject => "parental: you have a todo that needs to get done")
      end
    end
  end

end
