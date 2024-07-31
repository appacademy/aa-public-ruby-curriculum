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
  
  has_many :castings,
    class_name: :Casting,
    foreign_key: :actor_id,
    primary_key: :id,
    dependent: :destroy

  has_many :movies,
    through: :castings,
    source: :movie

  has_many :directed_movies,
    class_name: :Movie,
    foreign_key: :director_id,
    primary_key: :id,
    dependent: :nullify
  end