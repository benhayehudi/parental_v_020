class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.boolean :done, :default => false
      t.integer :todo_id
      t.integer :parent_id

      t.timestamps
    end
  end
end
