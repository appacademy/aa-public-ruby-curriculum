# == Schema Information
#
# Table name: cats
#
#  id          :integer      not null, primary key
#  name        :string
#  color       :string
#  breed       :string
#
# Table name: toys
#
#  id          :integer      not null, primary key
#  name        :string
#  color       :string
#  price       :integer
#
# Table name: cattoys
#
#  id          :integer      not null, primary key
#  cat_id      :integer      not null, foriegn key
#  toy_id      :integer      not null, foreign key

require_relative '../data/query_setup.rb'

# There are no specs for this part of the project.

# This file is set up so that when you invoke the method below 
# you can run the query by inputting the following in your terminal: ruby lib/index_problems.rb
# The terminal results will "puts" out onto new lines (similiar to how it looks in psql). 
# Or you can test your queries with pure SQL in psql!

# REMINDER: INDEX ONLY AS NEEDED. 
# The flow for this part of the project will be to run the query as it is
# to see which parts of the query might be slowing you down. 
# (Is there a sequence scan with a high total cost? Maybe a Nested Loop with a high total cost?)

# Create an index based on your ideas and see if the total cost for that query is improved. 

# If the total cost does not fall within the specified range, drop that index using:
# DROP INDEX index_name;

# Once that query has reached the desired range move on to the next problem. 

def example_index_problem
  # This query can be improved by creating an index for cats.name in your database!
  # Try with and without the index to see the improvement.

  # Get cost within the range of: 4..15

  # In the Meowtime postgres database you can run the following to add an index:
  # CREATE INDEX cats_name ON cats(name);
  execute(<<-SQL)
    EXPLAIN
      SELECT
        cats.name
      FROM
        cats
      WHERE
        cats.name = 'Jet';
  SQL
end

def toy_time
  # This query will find the price of the most expensive toy named 'Kiss'.
  # Now create an index in your database that will make this query more efficient.
  
  # HINT: look at which node of the query plan is most costly? The Sort? The Seq Scan?
  
  # REMINDER: Only one index is needed per problem! 
  # Get cost within the range of: 32..45
  execute(<<-SQL)
    EXPLAIN
      SELECT
        toys.price
      FROM
        toys
      WHERE
        toys.name = 'Kiss'
      ORDER BY
        toys.price DESC
      LIMIT 1;
  SQL
  # CREATE INDEX toys_name ON toys(name);
end

def gold_cat_toys
  # Find the `toys` name for each `cat` that is 'Gold'.
  
  # Get cost within the range of: 95..550
  execute(<<-SQL)
    EXPLAIN
      SELECT
        toys.name
      FROM
        toys
      JOIN
        cattoys ON toys.id = cattoys.toy_id
      JOIN
        cats ON cats.id = cattoys.cat_id
      WHERE
        cats.color = 'Gold';
  SQL
  # CREATE INDEX cats_color ON cats(color);
end

def who_owns_thumbs_up
  # This query lists the name of the 'Pink' colored cat who 
  # owns the toy named 'Thumbsup'.
  # Look at the Query Plan and notice the Seq Scan -
  # What kind of scan would be more efficent and what index could you create that would help?

  # Get cost within the range of: 4..150
  execute(<<-SQL)
    EXPLAIN
      SELECT
        cats.name, cats.color
      FROM
        cats
      JOIN
        cattoys ON cats.id = cattoys.cat_id
      JOIN
        toys ON toys.id = cattoys.toy_id
      WHERE 
        toys.name = 'Thumbsup' AND cats.color = 'Pink';
  SQL
   # CREATE INDEX cat_toys_toy_id ON cattoys(toy_id);
end

def popular_toys
  # Jet the cat has a ton of toys! This query shows the toys Jet has at least two copies of. 
  # Add the index that will make this query much more efficient!

  # Get cost within the range of: 30..50
  execute(<<-SQL)
    EXPLAIN
      SELECT
        toys.name,
        COUNT(*)
      FROM
        toys
      JOIN
        cattoys ON cattoys.toy_id = toys.id
      JOIN
        cats ON cats.id = cattoys.cat_id
      WHERE
        cats.name = 'Jet'
      GROUP BY
        toys.name
      HAVING
        COUNT(*) >= 2;
  SQL
     # CREATE INDEX cat_toys_cat_id ON cattoys(cat_id);
end








