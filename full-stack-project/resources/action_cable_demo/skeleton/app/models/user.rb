class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true

  has_many :messages, foreign_key: :author_id
  has_many :owned_rooms, foreign_key: :owner_id, class_name: :Room
  has_many :mentions
  has_secure_password

  before_validation { |user| user.session_token ||= SecureRandom.base64 }

  def self.find_by_credentials(username:, password:)
    User.find_by(username: username)&.authenticate(password)
  end
end
