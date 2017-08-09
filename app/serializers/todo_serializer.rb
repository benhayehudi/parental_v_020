class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :duedate, :created_at, :tasks, :done, :address, :parent_id
  
end
