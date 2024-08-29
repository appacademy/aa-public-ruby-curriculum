# == Schema Information
#
# Table name: albums
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  band_id    :bigint           not null
#  year       :integer          not null
#  live       :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Album < ApplicationRecord
  validates :band, :title, :year, presence: true
  # can't use presence validation with boolean field
  validates :live, inclusion: { in: [true, false] }
  validates :title, uniqueness: { scope: :band_id }
  validates :year, numericality: { minimum: 1900, maximum: 9000 }

  after_initialize :set_defaults

  belongs_to :band
  has_many :tracks, dependent: :destroy

  def set_defaults
    self.live ||= false
  end
end