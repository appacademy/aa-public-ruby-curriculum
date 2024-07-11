class Message < ApplicationRecord
  validates :body, presence: true

  belongs_to :author, class_name: :User
  belongs_to :room
  has_many :mentions, dependent: :destroy
  has_many :mentioned_users, through: :mentions, source: :user

  after_create :create_mentions!

  def mentioned_usernames
    mentioned_users.map { |user| '@' + user.username }
  end

  private

  def create_mentions!
    body
      .split
      .filter_map { |word| word[/^@(\w+)/, 1] }
      .filter_map { |name| User.find_by(username: name) }
      .uniq
      .each { |user| mentions.create(user: user) }
  end
end
