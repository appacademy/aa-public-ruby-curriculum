# == Schema Information
#
# Table name: user_comments
#
#  id           :bigint           not null, primary key
#  body         :string           not null
#  author_id    :bigint           not null
#  recipient_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
FactoryBot.define do
  factory :user_comment do
    body { "MyString" }
    author { nil }
    recipient { nil }
  end
end