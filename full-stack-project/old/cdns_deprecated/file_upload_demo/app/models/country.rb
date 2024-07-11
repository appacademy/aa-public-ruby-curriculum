# == Schema Information
#
# Table name: countries
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime
#  updated_at :datetime
#

class Country < ActiveRecord::Base
  has_many(
    :users,
    class_name: "User",
    foreign_key: :country_id,
    primary_key: :id
  )

  has_many(
    :tweets,
    through: :users,
    source: :tweets
  )
end
