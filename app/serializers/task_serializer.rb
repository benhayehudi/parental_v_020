class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :done, :parent_id, :todo_id
  
end
