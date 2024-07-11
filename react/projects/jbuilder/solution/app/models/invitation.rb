class Invitation < ApplicationRecord
  validates :party, :guest, presence: true

  belongs_to :party
  belongs_to :guest
end
