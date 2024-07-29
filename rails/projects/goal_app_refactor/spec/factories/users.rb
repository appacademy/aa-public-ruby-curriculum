# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  cheer_count     :integer          not null
#
FactoryBot.define do
  factory :user do
    username { Faker::Internet.unique.user_name }
    password { "password" }

    factory :user_hw do
      username { "hello_world" }
    end

    factory :user_foo do
      username { "foo_bar" }
    end
  end
end