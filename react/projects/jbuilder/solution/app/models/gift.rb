class Gift < ApplicationRecord
  validates :description, :title, :guest, presence: true

  belongs_to :guest
end
