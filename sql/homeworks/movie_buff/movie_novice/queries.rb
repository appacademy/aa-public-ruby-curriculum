# == Schema Information
#
# Table name: actors
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Table name: movies
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  yr          :integer          not null
#  score       :float            not null
#  votes       :integer          not null
#  director_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Table name: castings
#
#  id         :bigint           not null, primary key
#  movie_id   :bigint           not null
#  actor_id   :bigint           not null
#  ord        :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null


def find_angelina
  # find Angelina Jolie by name in the actors table

end

def top_titles
  # get movie titles from movies with scores greater than or equal to 9
  # hint: use 'select' and 'where'
  
end

def star_wars
  # display the id, title, and year of each Star Wars movie in movies
  # hint: use 'select' and 'where'
  
end


def below_average_years
  # display each year with movies scoring under 5, with the count of movies
  # scoring under 5 aliased as bad_movies, in descending order
  # hint: use 'select', 'where', 'group', 'order'
  
end

def alphabetized_actors
  # display the id and name of the second 10 actor names (i.e., #s 11-20)
  # when ordered from A-Z
  # hint: use 'order' and 'limit'
  
end

def pulp_fiction_actors
  # practice using joins
  # display the id and name of all actors in the movie Pulp Fiction
  # hint: use 'select', 'joins', 'where'
  
end

def uma_movies
  # practice using joins
  # display the id, title, and year of movies Uma Thurman has acted in
  # order them by ascending year
  # hint: use 'select', 'joins', 'where', and 'order'
  
end