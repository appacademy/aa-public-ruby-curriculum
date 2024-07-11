require 'singleton'
require 'sqlite3'

class QuestionsDatabase < SQLite3::Database
  include Singleton

  SQL_FILE = File.join(File.dirname(__FILE__), 'import_db.sql')
  DB_FILE = File.join(File.dirname(__FILE__), 'questions.db')

  def self.open
    @database = SQLite3::Database.new(DB_FILE)
    @database.results_as_hash = true
    @database.type_translation = true
  end

  def self.instance
    reset! if @database.nil?
    @database
  end 
  
  def self.reset!
    commands = [
      "rm '#{DB_FILE}'",
      "cat '#{SQL_FILE}' | sqlite3 '#{DB_FILE}'"
    ]
    
    commands.each {|command| `#{command}` }
    QuestionsDatabase.open
  end 

  def self.execute(*args)
    instance.execute(*args)
  end

  def self.get_first_row(*args)
    instance.get_first_row(*args)
  end

  def self.get_first_value(*args)
    instance.get_first_value(*args)
  end

  def self.last_insert_row_id
    instance.last_insert_row_id
  end
end
