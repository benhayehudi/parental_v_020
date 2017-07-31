class UserMailer < ActionMailer::Base
  default :from => "noreply@parental.bengreenberg.org"

  def reminder_email
    mail(:to => "#{todo.parent.name} <#{todo.parent.email}>", :subject => "parental: you have a todo that needs to get done")
  end

end
