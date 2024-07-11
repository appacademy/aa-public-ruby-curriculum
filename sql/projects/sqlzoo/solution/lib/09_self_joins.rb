# == Schema Information
#
# Table name: stops
#
#  id          :integer      not null, primary key
#  name        :string
#
# Table name: routes
#
#  num         :string       not null, primary key
#  company     :string       not null, primary key
#  pos         :integer      not null, primary key
#  stop_id     :integer

require_relative './sqlzoo.rb'

def num_stops
  # How many stops are in the database?
  execute(<<-SQL)
    SELECT
      COUNT(DISTINCT(routes.stop_id))
    FROM
      routes;
  SQL
end

def craiglockhart_id
  # Find the id value for the stop 'Craiglockhart'.
  execute(<<-SQL)
    SELECT
      stops.id
    FROM
      stops
    WHERE
      stops.name = 'Craiglockhart';
  SQL
end

def lrt_stops
  # Give the id and the name for the stops on the '4' 'LRT' service.
  execute(<<-SQL)
    SELECT
      routes.stop_id,
      stops.name
    FROM
      routes
    JOIN
      stops ON routes.stop_id = stops.id
    WHERE
      routes.company = 'LRT'
      AND routes.num = '4';
  SQL
end

def connecting_routes
  # Consider the following query:
  #
  # SELECT
  #   company,
  #   num,
  #   COUNT(*)
  # FROM
  #   routes
  # WHERE
  #   stop_id = 149 OR stop_id = 53
  # GROUP BY
  #   company, num
  #
  # The query gives the number of routes that visit either London Road
  # (149) or Craiglockhart (53). Run the query and notice the two services
  # that link these stops have a count of 2. Add a HAVING clause to restrict
  # the output to these two routes.
  execute(<<-SQL)
    SELECT
      company,
      num,
      COUNT(*)
    FROM
      routes
    WHERE
      stop_id = 149 OR stop_id = 53
    GROUP BY
      company, num
    HAVING
      COUNT(*) = 2
  SQL
end

def cl_to_lr
  # Consider the query:
  #
  # SELECT
  #   a.company,
  #   a.num,
  #   a.stop_id,
  #   b.stop_id
  # FROM
  #   route a
  # JOIN
  #   route b ON (a.company = b.company AND a.num = b.num)
  # WHERE
  #   a.stop_id = 53
  #
  # Observe that b.stop_id gives all the places you can get to from
  # Craiglockhart, without changing routes. Change the query so that it
  # shows the services from Craiglockhart to London Road.
  execute(<<-SQL)
    SELECT
      a.company,
      a.num,
      a.stop_id,
      b.stop_id
    FROM
      routes a
    JOIN
      routes b ON a.company = b.company AND a.num = b.num
    WHERE
      a.stop_id = 53 AND b.stop_id = 149
  SQL
end

def cl_to_lr_by_name
  # Consider the query:
  #
  # SELECT
  #   a.company,
  #   a.num,
  #   stopa.name,
  #   stopb.name
  # FROM
  #   route a
  # JOIN
  #   route b ON (a.company = b.company AND a.num = b.num)
  # JOIN
  #   stops stopa ON (a.stop_id = stopa.id)
  # JOIN
  #   stops stopb ON (b.stop_id = stopb.id)
  # WHERE
  #   stopa.name = 'Craiglockhart'
  #
  # The query shown is similar to the previous one, however by joining two
  # copies of the stops table we can refer to stops by name rather than by
  # number. Change the query so that the services between 'Craiglockhart' and
  # 'London Road' are shown.
  execute(<<-SQL)
    SELECT
      a.company,
      a.num,
      stopa.name,
      stopb.name
    FROM
      routes a
    JOIN
      routes b ON a.company = b.company AND a.num = b.num
    JOIN
      stops stopa ON a.stop_id = stopa.id
    JOIN
      stops stopb ON b.stop_id = stopb.id
    WHERE
      stopa.name = 'Craiglockhart' AND stopb.name = 'London Road'
  SQL
end

def haymarket_and_leith
  # Give the company and num of the services that connect stops
  # 115 and 137 ('Haymarket' and 'Leith')
  execute(<<-SQL)
    SELECT DISTINCT
      start_routes.company,
      start_routes.num
    FROM
      routes AS start_routes
    JOIN
      routes AS end_routes ON start_routes.company = end_routes.company
        AND start_routes.num = end_routes.num
    WHERE
      start_routes.stop_id = 115 AND end_routes.stop_id = 137
  SQL
end

def craiglockhart_and_tollcross
  # Give the company and num of the services that connect stops
  # 'Craiglockhart' and 'Tollcross'
  execute(<<-SQL)
    SELECT
      start_routes.company,
      start_routes.num
    FROM
      routes AS start_routes
    JOIN
      routes AS end_routes ON start_routes.company = end_routes.company
        AND start_routes.num = end_routes.num
    JOIN
      stops AS origin_stops ON origin_stops.id = start_routes.stop_id
    JOIN
      stops AS destination_stops ON destination_stops.id = end_routes.stop_id
    WHERE
      origin_stops.name = 'Craiglockhart'
        AND destination_stops.name = 'Tollcross'
  SQL
end

def start_at_craiglockhart
  # Give a distinct list of the stops that can be reached from 'Craiglockhart'
  # by taking one bus, including 'Craiglockhart' itself. Include the stop name,
  # as well as the company and bus no. of the relevant service.
  execute(<<-SQL)
    SELECT
      end_route_stops.name,
      end_routes.company,
      end_routes.num
    FROM
      routes AS start_routes
    JOIN
      routes AS end_routes ON start_routes.num = end_routes.num
        AND start_routes.company = end_routes.company
    JOIN
      stops AS end_route_stops ON end_routes.stop_id = end_route_stops.id
    JOIN
      stops AS origin_stops ON origin_stops.id = start_routes.stop_id
    WHERE origin_stops.name = 'Craiglockhart'
  SQL
end

# ------------- joins version --------------
def craiglockhart_to_sighthill
  # Find the routes involving two buses that can go from Craiglockhart to
  # Sighthill. Show the bus no. and company for the first bus, the name of the
  # stop for the transfer, and the bus no. and company for the second bus.
  execute(<<-SQL)
    SELECT DISTINCT
      start.num,
      start.company,
      transfer.name,
      finish.num,
      finish.company
    FROM
      routes start
    JOIN
      routes AS to_transfer ON start.company = to_transfer.company
        AND start.num = to_transfer.num
    JOIN
      stops AS transfer ON to_transfer.stop_id = transfer.id
    JOIN
      routes AS from_transfer ON transfer.id = from_transfer.stop_id
    JOIN
      routes AS finish ON from_transfer.company = finish.company
        AND from_transfer.num = finish.num
    JOIN
      stops AS origin_stops ON start.stop_id = origin_stops.id
    JOIN
      stops AS destination_stops ON finish.stop_id = destination_stops.id
    WHERE
      origin_stops.name = 'Craiglockhart'
        AND destination_stops.name = 'Sighthill'
  SQL
end


# ------------- subquery version --------------
def craiglockhart_to_sighthill_subqueries
  execute(<<-SQL)
    SELECT DISTINCT
      start.num,
      start.company,
      transfer.name,
      finish.num,
      finish.company
    FROM
      routes AS start
    JOIN
      stops AS transfer ON transfer.id = start.stop_id
    JOIN
      routes AS finish ON transfer.id = finish.stop_id
    WHERE
      (start.num, start.company) IN (
        SELECT
          num, company
        FROM
          routes
        WHERE
          stop_id IN (
            SELECT
              id
            FROM
              stops
            WHERE
              name = 'Craiglockhart'
          )
      ) AND transfer.id IN (
        SELECT
          stop_id
        FROM
          routes
        WHERE
          routes.num IN (
            SELECT
              num
            FROM
              routes
            WHERE
              routes.stop_id IN (
                SELECT
                  id
                FROM
                  stops
                WHERE
                  name = 'Craiglockhart'
                )
          ) AND routes.company IN (
            SELECT
              company
            FROM
              routes
            WHERE
              routes.stop_id IN (
                SELECT
                  id
                FROM
                  stops
                WHERE
                  name = 'Craiglockhart'
                )
          )
      ) AND transfer.id IN (
        SELECT
          stop_id AS transfer_point
        FROM
          routes
        WHERE
          routes.num IN (
            SELECT
              num
            FROM
              routes
            WHERE
              routes.stop_id IN (
                SELECT
                  id
                FROM
                  stops
                WHERE
                  name = 'Sighthill'
                )
          ) AND routes.company IN (
            SELECT
              company
            FROM
              routes
            WHERE
              routes.stop_id IN (
                SELECT
                  id
                FROM
                  stops
                WHERE
                  name = 'Sighthill'
                )
          )
      ) AND (finish.num, finish.company) IN (
        SELECT
          num, company
        FROM
          routes
        WHERE
          stop_id IN (
            SELECT
              id
            FROM
              stops
            WHERE
              name = 'Sighthill'
          )
      )
  SQL
end
