class Todo < ApplicationRecord
  belongs_to :parent
  has_many :tasks

  accepts_nested_attributes_for :parent, :tasks

end
