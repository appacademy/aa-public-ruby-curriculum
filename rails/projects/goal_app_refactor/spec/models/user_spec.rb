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
require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:gerald) do
    User.create!(
      username: "gerald",
      password: "super_secret_password"
    )
  end

  describe "session_token" do
    it "is always set to a valid value before validation" do
      gerald.session_token = nil
      expect(gerald.valid?).to be true
      expect(gerald.session_token).not_to be_nil
    end
  end

  describe "password encryption" do
    it "does not save passwords to the database" do
      User.create!(username: "mary_mack", password: "abcdef")
      user = User.find_by(username: "mary_mack")
      expect(user.password).not_to eq("abcdef")
    end

    it "encrypts the password using BCrypt" do
      expect(BCrypt::Password).to receive(:create)
      User.new(username: "mary_mack", password: "abcdef")
    end
  end

  describe "User.find_by_credentials" do
    let!(:mary) { User.create!(username: "mary_mack", password: "abcdef") }

    it "finds a user given the correct name and password" do
      user = User.find_by_credentials("mary_mack", "abcdef")
      expect(user.username).to eq("mary_mack")
    end

    it "returns nil if given an incorrect username" do
      user = User.find_by_credentials("mary", "abcdef")
      expect(user).to be_nil
    end

    it "returns nil if given an incorrect password" do
      user = User.find_by_credentials("mary_mack", "ab")
      expect(user).to be_nil
    end
  end

  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username) }
  it { should validate_length_of(:password).is_at_least(6).allow_nil }
  it { should validate_numericality_of(:cheer_count).only_integer.is_greater_than_or_equal_to(0) }
  it { should have_many(:goals).dependent(:destroy) }
  it { should have_many(:authored_comments).dependent(:destroy) }
  it { should have_many(:comments).dependent(:destroy) }
  it { should have_many(:cheers_given).dependent(:destroy) }
  it { should have_many(:cheers_received).through(:goals).dependent(false) }
end