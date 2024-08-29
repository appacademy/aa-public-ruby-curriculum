# == Schema Information
#
# Table name: cats
#
#  id          :bigint           not null, primary key
#  birth_date  :date             not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  owner_id    :bigint           not null
#
require 'action_view'

class Cat < ApplicationRecord
  include ActionView::Helpers::DateHelper

  # .freeze renders a constant immutable.
  CAT_COLORS = %w[black white orange brown].freeze

  validates :color, inclusion: CAT_COLORS
  validates :sex, inclusion: %w[M F]
  # Note that you don't need to validate `color` or `sex` for presence because
  # NULL values for those columns will fail the inclusion tests.
  validates :birth_date, :name, presence: true
  validate :birth_date_cannot_be_future

  # Remember: `belongs_to` and `has_many` are just methods where the first
  # argument is the name of the association and the second argument is an
  # options hash.
  belongs_to :owner,
    class_name: 'User'

  has_many :rental_requests,
    class_name: :CatRentalRequest,
    dependent: :destroy

  def birth_date_cannot_be_future
    # Must check that birth_date is present because `>` will crash if run on
    # `nil`
    return unless birth_date.present? && birth_date > Date.today

    errors.add(:birth_date, "can't be in the future")
  end

  def age
    time_ago_in_words(birth_date)
  end
end