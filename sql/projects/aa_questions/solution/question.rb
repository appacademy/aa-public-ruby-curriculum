require_relative 'questions_database'
require_relative 'question_follow'
require_relative 'question_like'
require_relative 'user'
require_relative 'reply'
require_relative 'model_base'

class Question < ModelBase
  def self.find(id)
    question_data = QuestionsDatabase.get_first_row(<<-SQL, id: id)
      SELECT
        questions.*
      FROM
        questions
      WHERE
        questions.id = :id
    SQL

    Question.new(question_data)
  end

  def self.find_by_author_id(author_id)
    questions_data = QuestionsDatabase.execute(<<-SQL, author_id: author_id)
      SELECT
        questions.*
      FROM
        questions
      WHERE
        questions.author_id = :author_id
    SQL

    questions_data.map { |question_data| Question.new(question_data) }
  end

  def self.most_followed(n)
    QuestionFollow.most_followed_questions(n)
  end

  def self.most_liked(n)
    QuestionLike.most_liked_questions(n)
  end

  attr_reader :id
  attr_accessor :title, :body, :author_id

  def initialize(options)
    @id, @title, @body, @author_id =
      options.values_at('id', 'title', 'body', 'author_id')
  end

  def attrs
    { title: title, body: body, author_id: author_id }
  end

  def save
    if @id
      QuestionsDatabase.execute(<<-SQL, attrs.merge({ id: id }))
        UPDATE
          questions
        SET
          title = :title, body = :body, author_id = :author_id
        WHERE
          questions.id = :id
      SQL
    else
      QuestionsDatabase.execute(<<-SQL, attrs)
        INSERT INTO
          questions (title, body, author_id)
        VALUES
          (:title, :body, :author_id)
      SQL

      @id = QuestionsDatabase.last_insert_row_id
    end

    self
  end

  def author
    User.find_by_id(author_id)
  end

  def followers
    QuestionFollow.followers_for_question_id(id)
  end

  def num_likes
    QuestionLike.num_likes_for_question_id(id)
  end

  def replies
    Reply.find_by_question_id(id)
  end
end
