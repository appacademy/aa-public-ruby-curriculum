# == Schema Information
#
# Table name: castings
#
#  id         :bigint           not null, primary key
#  movie_id   :bigint           not null
#  actor_id   :bigint           not null
#  ord        :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Casting < ApplicationRecord
  validates :ord, presence: true
  
  belongs_to :actor
  # shorthand for:
  # belongs_to :actor,
  # class_name: 'Actor',
  # foreign_key: :actor_id,
  # primary_key: :id

  belongs_to :movie
  # shorthand for:
  # belongs_to :movie,
  # class_name: 'Movie',
  # foreign_key: :movie_id,
  # primary_key: :id
end