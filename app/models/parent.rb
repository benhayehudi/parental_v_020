class Parent < ApplicationRecord
  has_secure_password
  has_many :tasks
  has_many :todos, through: :tasks
  # accepts_nested_attributes_for :todos
  # accepts_nested_attributes_for :tasks

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :email, presence: true
  validates :email, uniqueness: true
end
