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
class User < ApplicationRecord
  validates :session_token, presence: true
  validates :username, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password_digest, presence: { message: 'Password can\'t be blank.' }
  validates :cheer_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  
  attr_reader :password

  before_validation :ensure_session_token, :ensure_cheer_count

  has_many :goals, 
    foreign_key: :author_id,
    dependent: :destroy,
    inverse_of: :author

  has_many :comments,
    foreign_key: :recipient_id,
    class_name: :UserComment,
    dependent: :destroy,
    inverse_of: :recipient

  has_many :authored_comments, 
    foreign_key: :author_id,
    class_name: :UserComment,
    dependent: :destroy,
    inverse_of: :author

  has_many :cheers_given,
    class_name: :Cheer,
    foreign_key: :giver_id,
    dependent: :destroy,
    inverse_of: :giver

  has_many :cheers_received,
    through: :goals,
    source: :cheers

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    # `user&.is_password?(password)` is syntactic sugar for
    # `user && user.is_password?(password)`
    user&.is_password?(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  def is_password?(maybe_password)
    BCrypt::Password.new(self.password_digest).is_password?(maybe_password)
  end

  def password=(new_pw)
    @password = new_pw
    self.password_digest = BCrypt::Password.create(new_pw)
  end

  def decrement_cheer_count!
    self.cheer_count -= 1
    self.save!
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

  def ensure_cheer_count
    self.cheer_count ||= Cheer::CHEER_LIMIT
  end
end