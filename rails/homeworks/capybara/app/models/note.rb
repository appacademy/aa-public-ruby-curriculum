# == Schema Information
#
# Table name: notes
#
#  id         :bigint           not null, primary key
#  track_id   :bigint           not null
#  author_id  :bigint           not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Note < ApplicationRecord
  validates :content, presence: true
  
  belongs_to :track
  belongs_to :author, class_name: :User
end