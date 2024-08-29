# == Schema Information
#
# Table name: goals
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  private    :boolean          default(FALSE), not null
#  details    :text
#  completed  :boolean          default(FALSE), not null
#  author_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :goal do
    title { Faker::Lorem.words(number: 3).join(" ") }
    details { Faker::Lorem.words(number: 5).join(" ") }
    author { nil }

    factory :private_goal do
      private { true }
    end

    factory :completed_goal do
      completed { true }
    end
  end
end