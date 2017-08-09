class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :duedate, :tasks, :done, :address, :parent_id
  
end
