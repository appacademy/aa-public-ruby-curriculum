# == Schema Information
#
# Table name: movies
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  yr          :integer          not null
#  score       :float            not null
#  votes       :integer          not null
#  director_id :bigint           
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Movie < ApplicationRecord
  validates :title, :yr, :score, :votes, presence: true
  
  belongs_to :director,
    class_name: :Actor,
    foreign_key: :director_id,
    primary_key: :id

  has_many :castings,
    class_name: :Casting,
    foreign_key: :movie_id,
    primary_key: :id,
    dependent: :destroy

  has_many :actors,
    through: :castings,
    source: :actor
end