class Mention < ApplicationRecord
  validates :read, inclusion: { in: [true, false] }
  
  belongs_to :message
  belongs_to :user

  before_validation { |mention| mention.read ||= false }
end
