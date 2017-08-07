class Todo < ApplicationRecord
  belongs_to :parent
  has_many :tasks

  # accepts_nested_attributes_for :parent, :tasks


  def self.late_todos
    self.all.where('done = ? AND duedate < ?', false, Date.today)
  end
end
