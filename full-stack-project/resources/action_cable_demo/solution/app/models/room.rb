class Room < ApplicationRecord
  validates :name, presence: true
  belongs_to :owner, class_name: :User
  has_many :messages, dependent: :destroy
end
