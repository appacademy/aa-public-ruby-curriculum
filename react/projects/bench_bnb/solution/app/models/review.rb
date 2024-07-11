class Review < ApplicationRecord
  validates :rating, inclusion: { in: (1..5) }

  belongs_to :bench
  belongs_to :author,
    class_name: :User
end
