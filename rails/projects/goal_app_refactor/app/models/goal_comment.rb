# == Schema Information
#
# Table name: goal_comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  author_id  :bigint           not null
#  goal_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class GoalComment < ApplicationRecord
  validates :body, presence: true

  belongs_to :author, class_name: :User
  belongs_to :goal
end