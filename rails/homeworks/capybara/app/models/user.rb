# == Schema Information
#
# Table name: users
#
#  id               :bigint           not null, primary key
#  email            :string           not null
#  password_digest  :string           not null
#  session_token    :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  activated        :boolean          default(FALSE), not null
#  activation_token :string           not null
#  admin            :boolean          default(FALSE), not null
#
class User < ApplicationRecord
  validates :activation_token, :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  # can't use presence validation with boolean field
  validates :activated, :admin, inclusion: { in: [true, false] }
  validates :email,
            :password_digest,
            :session_token,
            :activation_token,
            presence: true

  attr_reader :password

  before_validation :ensure_session_token
  after_initialize :set_activation_token, :set_defaults

  has_many :notes, foreign_key: :author_id, dependent: :destroy, inverse_of: :author

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    # `user&.is_password?(password)` is syntactic sugar for
    # `user && user.is_password?(password)`
    user&.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  def activate!
    self.toggle!(:activated) unless self.activated?
  end

  def toggle_admin!
    self.toggle!(:admin)
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

  ##
  # This method is for the mailer!
  ##
  def generate_unique_activation_token
    loop do
      token = SecureRandom::urlsafe_base64(16)
      return token unless self.class.exists?(activation_token: token)
    end
  end

  def set_activation_token
    self.activation_token ||= generate_unique_activation_token
  end

  def set_defaults
    self.activated ||= false
    self.admin ||= false
  end
end