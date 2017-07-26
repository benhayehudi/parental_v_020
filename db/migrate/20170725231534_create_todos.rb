class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.boolean :done, :default => false
      t.integer :parent_id

      t.timestamps
    end
  end
end
