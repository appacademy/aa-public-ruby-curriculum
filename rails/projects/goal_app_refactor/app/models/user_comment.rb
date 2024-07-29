# == Schema Information
#
# Table name: user_comments
#
#  id           :bigint           not null, primary key
#  body         :string           not null
#  author_id    :bigint           not null
#  recipient_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class UserComment < ApplicationRecord
  validates :body, presence: true

  belongs_to :author, class_name: :User
  belongs_to :recipient, class_name: :User
end