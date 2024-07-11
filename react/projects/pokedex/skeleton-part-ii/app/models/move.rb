class Move < ApplicationRecord
    validates :name, null: false, uniqueness: true
end
