# == Schema Information
#
# Table name: actors
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Actor < ApplicationRecord
  validates :name, presence: true

  has_many :castings, dependent: :destroy
  # shorthand for:
  # has_many :castings,
  # class_name: 'Casting',
  # foreign_key: :actor_id,
  # primary_key: :id,
  # dependent: :destroy

  has_many :movies, through: :castings
  # shorthand for:
  # has_many :movies,
  # through: :castings,
  # source: :movie

  has_many :directed_movies,
    foreign_key: :director_id,
    class_name: 'Movie',
    dependent: :nullify
  # shorthand for:
  # has_many :directed_movies,
  # foreign_key: :director_id,
  # class_name: 'Movie',
  # primary_key: :id,
  # dependent: :nullify
end