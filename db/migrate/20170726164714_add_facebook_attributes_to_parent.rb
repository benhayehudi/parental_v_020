class AddFacebookAttributesToParent < ActiveRecord::Migration[5.1]
  def change
    add_column :parents, :image, :string
    add_column :parents, :uid, :string
  end
end
