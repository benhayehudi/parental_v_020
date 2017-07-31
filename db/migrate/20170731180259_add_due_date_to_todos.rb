class AddDueDateToTodos < ActiveRecord::Migration[5.1]
  def change
    add_column :todos, :duedate, :date
  end
end
