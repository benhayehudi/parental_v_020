desc "This task is called by the Heroku scheduler add-on"

task :send_reminders => :environment do
  @parent = current_user
  @todos = Todo.left_outer_joins(:parent).where('parent_id = ?', @parent.id)
  @todo.each do |todo|
    if todo.duedate == Date.today || todo.duedate == Date.tomorrow
      UserMailer.reminder_email(@parent).deliver
    end
  end
end
