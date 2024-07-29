# == Schema Information
#
# Table name: cheers
#
#  id         :bigint           not null, primary key
#  giver_id   :bigint           not null
#  goal_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Cheer < ApplicationRecord
  CHEER_LIMIT = 12
  ##
  # Don't let others change the limit!
  ##
  CHEER_LIMIT.freeze

  validates :goal_id, uniqueness: { scope: :giver_id }
  
  belongs_to :giver, class_name: :User
  belongs_to :goal
end