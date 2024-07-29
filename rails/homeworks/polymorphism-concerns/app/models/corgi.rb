# == Schema Information
#
# Table name: corgis
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Corgi < ApplicationRecord
  validates :name, presence: true
end