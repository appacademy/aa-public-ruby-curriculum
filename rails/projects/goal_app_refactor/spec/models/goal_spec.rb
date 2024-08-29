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
require 'rails_helper'

RSpec.describe Goal, type: :model do
  it { should validate_presence_of(:title) }
  it { should belong_to(:author) }
  it { should have_many(:comments).dependent(:destroy) }
  it { should have_many(:cheers).dependent(:destroy) }
end