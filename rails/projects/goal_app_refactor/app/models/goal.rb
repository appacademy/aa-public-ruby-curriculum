# == Schema Information
#
# Table name: goals
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  private    :boolean          default(FALSE), not null
#  details    :text
#  completed  :boolean          default(FALSE), not null
#  author_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Goal < ApplicationRecord
  validates :title, presence: true

  belongs_to :author, class_name: :User
  has_many :comments, class_name: :GoalComment, dependent: :destroy
  has_many :cheers, dependent: :destroy

  def cheered_by?(user)
    cheers.exists?(giver_id: user.id)
  end
end