require 'singleton'
require 'sqlite3'

class SchoolDatabase < SQLite3::Database
  # Ruby provides a `Singleton` module that will only let one
  # `SchoolDatabase` object get instantiated. This is useful, because
  # there should only be a single connection to the database; there
  # shouldn't be multiple simultaneous connections. A call to
  # `SchoolDatabase::new` will result in an error. To get access to the
  # *single* SchoolDatabase instance, we call `#instance`.
  #
  # Don't worry too much about `Singleton`; it has nothing
  # intrinsically to do with SQL.
  include Singleton

  def initialize
    # Tell the SQLite3::Database the db file to read/write.
    super('school.db')

    # Typically each row is returned as an array of values; it's more
    # convenient for us if we receive hashes indexed by column name.
    self.results_as_hash = true

    # Typically all the data is returned as strings and not parsed
    # into the appropriate type.
    self.type_translation = true
  end
end

class Department
  def self.all
    # execute a SELECT; result in an `Array` of `Hash`es, each
    # represents a single row.
    results = SchoolDatabase.instance.execute('SELECT * FROM departments')
    results.map { |result| Department.new(result) }
  end

  attr_accessor :id, :name

  def initialize(options = {})
    @id = options['id']
    @name = options['name']
  end

  def create
    # in this example, we'll only allow new rows to be created; never
    # modified.
    raise 'already saved!' unless self.id.nil?

    # execute an INSERT; the '?' gets replaced with the value name. The
    # '?' lets us separate SQL commands from data, improving
    # readability, and also safety (lookup SQL injection attack on
    # wikipedia).
    SchoolDatabase.instance.execute(<<-SQL, name)
      INSERT INTO
        departments (name)
      VALUES
        (?)
    SQL

    @id = SchoolDatabase.instance.last_insert_row_id
  end

  def professors
    results = SchoolDatabase.instance.execute(<<-SQL, self.id)
      SELECT
        *
      FROM
        professors
      WHERE
        professors.department_id = ?
    SQL

    results.map { |result| Professor.new(result) }
  end
end

class Professor
  attr_accessor :id, :first_name, :last_name, :department_id

  def initialize(options = {})
    @id, @first_name, @last_name, @department_id =
      options.values_at('id', 'first_name', 'last_name', 'department_id')
  end

  def create
    raise 'already saved!' unless self.id.nil?

    # execute an INSERT; the '?' gets replaced with the value name. The
    # '?' lets us separate SQL commands from data, improving
    # readability, and also safety (lookup SQL injection attack on
    # wikipedia).
    params = [self.first_name, self.last_name, self.department_id]
    SchoolDatabase.instance.execute(<<-SQL, *params)
      INSERT INTO
        professors (first_name, last_name, department_id)
      VALUES
        (?, ?, ?)
    SQL

    @id = SchoolDatabase.instance.last_insert_row_id
  end
end
