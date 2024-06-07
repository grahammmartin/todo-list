class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :is_completed
end
