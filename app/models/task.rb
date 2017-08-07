class Task < ApplicationRecord
  belongs_to :parent
  belongs_to :todo
end
