class Task < ApplicationRecord
  belongs_to :parent
  belongs_to :todo

  # accepts_nested_attributes_for :parent, :todo
end
