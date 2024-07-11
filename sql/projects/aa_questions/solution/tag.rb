require_relative 'questions_database'

class Tag
  def initialize(params = {})
    @name = params['name']
    @id = params['id']
  end

  def self.most_popular(n)
    results = QuestionsDatabase.execute(<<-SQL, n)
      SELECT
        tags.*
      FROM
        question_tags
      JOIN
        question_likes
      ON
        question_tags.question_id = question_likes.question_id
      JOIN
        tags
      ON
        question_tags.tag_id = tags.id
      GROUP BY
        tag_id
      ORDER BY
        COUNT(*) DESC
      LIMIT
        ?
    SQL

    results.map { |result| Tag.new(result) }
  end
end
