class AddAddressToTodo < ActiveRecord::Migration[5.1]
  def change
    add_column :todos, :address, :string
  end
end
