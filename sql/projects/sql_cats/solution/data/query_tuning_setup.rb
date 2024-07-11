require 'pg'

def execute(sql)
  conn = PG::Connection.open(:dbname => 'meowtime')
  query_result = conn.exec(sql).values
  conn.close
  
  query_result
end