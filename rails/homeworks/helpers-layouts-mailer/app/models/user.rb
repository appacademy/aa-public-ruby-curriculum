# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  # If a password was set, validate that it meets the requirements.
  # Note the `allow_nil`.
  validates :password, length: { minimum: 6, allow_nil: true }

  before_validation :ensure_session_token

  attr_reader :password

  # Remember: `has_many` is just a method where the first argument is the name
  # of the association and the second argument is an options hash.
  has_many :cats,
    foreign_key: :owner_id,
    dependent: :destroy,
    inverse_of: :owner

  has_many :cat_rental_requests,
    foreign_key: :requester_id,
    dependent: :destroy,
    inverse_of: :requester

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    # `user&.is_password?(password)` is syntactic sugar for
    # `user && user.is_password?(password)`
    user&.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  def owns_cat?(cat)
    cat.owner == self
  end

  private

  def generate_unique_session_token
    # `SecureRandom::urlsafe_base64` does not guarantee uniqueness. Wrapping
    # this call in a loop ensures that no other user has the generated token.
    loop do
      session_token = SecureRandom::urlsafe_base64(16)
      return session_token unless User.exists?(session_token: session_token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end