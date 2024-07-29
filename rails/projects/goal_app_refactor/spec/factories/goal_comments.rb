# == Schema Information
#
# Table name: goal_comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  author_id  :bigint           not null
#  goal_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :goal_comment do
    body { "MyString" }
    author { nil }
    goal { nil }
  end
end