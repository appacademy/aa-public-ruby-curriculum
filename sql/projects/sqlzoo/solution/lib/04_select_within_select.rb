# == Schema Information
#
# Table name: countries
#
#  name        :string       not null, primary key
#  continent   :string
#  area        :integer
#  population  :integer
#  gdp         :integer

require_relative './sqlzoo.rb'

# A note on subqueries: we can refer to values in the outer SELECT within the
# inner SELECT. We can name the tables so that we can tell the difference
# between the inner and outer versions.

def example_select_with_subquery
  execute(<<-SQL)
    SELECT
      name
    FROM
      countries
    WHERE
      population > (
        SELECT
          population
        FROM
          countries
        WHERE
          name='Romania'
      );
  SQL
end

def larger_than_russia
  # List each country name where the population is larger than 'Russia'.
  execute(<<-SQL)
    SELECT
      c1.name
    FROM
      countries c1
    WHERE
      c1.population > (
        SELECT
          c2.population
        FROM
          countries c2
        WHERE
          c2.name = 'Russia'
      );
  SQL
end

def richer_than_england
  # Show the countries in Europe with a per capita GDP greater than
  # 'United Kingdom'.
  execute(<<-SQL)
    SELECT
      countries.name
    FROM
      countries
    WHERE
      countries.continent = 'Europe'
      AND (countries.gdp / countries.population) > (
        SELECT
          c2.gdp / c2.population
        FROM
          countries c2
        WHERE
          c2.name = 'United Kingdom'
      );
  SQL
end

def neighbors_of_certain_b_countries
  # List the name and continent of countries in the continents containing
  # 'Belize', 'Belgium'.
  execute(<<-SQL)
    SELECT
      countries.name,
      countries.continent
    FROM
      countries
    WHERE
      countries.continent IN (
        SELECT
          c2.continent
        FROM
          countries c2
        WHERE
          c2.name IN ('Belize', 'Belgium')
      );
  SQL
end

def population_constraint
  # Which country has a population that is more than Canada but less than
  # Poland? Show the name and the population.
  execute(<<-SQL)
    SELECT
      countries.name,
      countries.population
    FROM
      countries
    WHERE
      countries.population > (
        SELECT
          c2.population
        FROM
          countries c2
        WHERE
          c2.name = 'Canada'
      )
      AND countries.population < (
        SELECT
          c2.population
        FROM
          countries c2
        WHERE
          c2.name = 'Poland'
      );
  SQL
end

def sparse_continents
  # Find every country that belongs to a continent where each country's
  # population is less than 25,000,000. Show name, continent and
  # population.
  # Hint: Sometimes rewording the problem can help you see the solution.
  execute(<<-SQL)
    SELECT
      c1.name,
      c1.continent,
      c1.population
    FROM
      countries c1
    WHERE
      c1.continent NOT IN (
        SELECT
          c2.continent
        FROM
          countries c2
        WHERE
          c2.population >= 25000000
      );
  SQL
end
