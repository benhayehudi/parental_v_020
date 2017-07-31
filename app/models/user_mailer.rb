class UserMailer < ActionMailer::Base
  default :from => "noreply@parental.bengreenberg.org"

  def registration_confirmation
    @parent = current_parent
    mail(:to => "#{@parent.name} <#{@parent.email}>", :subject => "parental: you have a todo that needs to get done")
  end

end
