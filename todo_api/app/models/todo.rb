class Todo < ApplicationRecord
  validates :title, presence: true
  validates :is_completed, inclusion: { in: [true, false] }

  scope :completed, -> { where(is_completed: true) }
  scope :pending, -> { where(is_completed: false) }
end
