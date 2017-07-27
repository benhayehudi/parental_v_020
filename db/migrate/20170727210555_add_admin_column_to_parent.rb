class AddAdminColumnToParent < ActiveRecord::Migration[5.1]
  def change
    add_column :parents, :admin, :boolean, :null => false, :default => false
  end
end
