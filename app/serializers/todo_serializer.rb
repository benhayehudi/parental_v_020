class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :duedate, :done, :address, :parent_id
  
end
