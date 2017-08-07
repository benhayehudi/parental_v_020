class Todo < ApplicationRecord
  belongs_to :parent
  has_many :tasks

  def self.late_todos
    self.all.where('done = ? AND duedate < ?', false, Date.today)
  end

  def tasks_attributes=(tasks_attrs)
    tasks_attrs.each do |key, task_hash|
      tasks.build(task_hash) if !task_hash.empty?
    end
  end
end
