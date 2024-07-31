# == Schema Information
#
# Table name: houses
#
#  id         :bigint           not null, primary key
#  address    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class House < ApplicationRecord
  has_many :gardeners,
    class_name: 'Gardener',
    foreign_key: :house_id,
    primary_key: :id,
    dependent: :destroy

  has_many :plants,
    through: :gardeners,
    source: :plants

  def n_plus_one_seeds
    # Make sure you understand what this one line does. It uses two `has_many`
    # associations, `plants` on a `House` and `seeds` on each of the resulting
    # `Plant`s. With regard to `:seeds`, Ruby first converts the symbol to a
    # proc using `to_proc` under the hood. The `&` then block-ifies the proc
    # since `map` takes a block.
    # The line is equivalent to: `plants.map { |plant| plant.seeds }`
    plants.map(&:seeds)
  end

  def better_seeds_query
    # Your code here
  end
end