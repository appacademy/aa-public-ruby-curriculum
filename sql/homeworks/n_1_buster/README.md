# Welcome to the N+1 Query Buster!

Your job today is to eliminate all the costly, inefficient `N+1` queries in the
code snippets below. Clone and write your code in the skeleton found through
the `Download Project` button at the bottom of this page. Make sure to run
`rails db:setup` to get the database seeded for you. Read through the
associations and methods for each example to understand what needs to be
fetched, then decide whether `.includes` or `.joins` is a better fit for the
situation and implement whichever you choose.

In the methods containing `# Your code here`, write the Active Record
code that will produce the same result without causing an N+1 query. Test the
query methods in the Rails console as you work. Remember to look at the SQL
queries displayed in the console to see if you're making an N+1 query.

Refer to the [Joins Demo][demo] for hints on what you might want to do!

[demo]: https://github.com/appacademy/practice-for-ch-sql-joins-demo

## Artists, Albums, and Tracks

Count all of the tracks on each album by a given artist.

```ruby
# app/models/track.rb
class Track
   belongs_to :album,
    class_name: 'Album',
    foreign_key: :album_id,
    primary_key: :id
end

# app/models/album.rb
class Album
  belongs_to :artist,
    class_name: 'Artist',
    foreign_key: :artist_id,
    primary_key: :id

  has_many :tracks,
    class_name: 'Track',
    foreign_key: :album_id,
    primary_key: :id,
    dependent: :destroy
end

# app/models/artist.rb
class Artist
  has_many :albums,
    class_name: 'Album',
    foreign_key: :artist_id,
    primary_key: :id,
    dependent: :destroy

  def n_plus_one_tracks
    my_albums = self.albums
    track_counts = {}
    my_albums.each do |album|
      track_counts[album.name] = album.tracks.length
    end

    track_counts
  end

  def better_tracks_query
    # Your code here
  end
end
```

Test in the Rails console:

```ruby
Artist.first.n_plus_one_tracks
  Artist Load (0.5ms)  SELECT  "artists".* FROM "artists" ORDER BY "artists"."id" ASC LIMIT $1  [["LIMIT", 1]]
  Album Load (0.6ms)  SELECT "albums".* FROM "albums" WHERE "albums"."artist_id" = $1  [["artist_id", 1]]
  Track Load (0.7ms)  SELECT "tracks".* FROM "tracks" WHERE "tracks"."album_id" = $1  [["album_id", 1]]
  Track Load (0.4ms)  SELECT "tracks".* FROM "tracks" WHERE "tracks"."album_id" = $1  [["album_id", 2]]
  Track Load (0.3ms)  SELECT "tracks".* FROM "tracks" WHERE "tracks"."album_id" = $1  [["album_id", 3]]
  Track Load (0.3ms)  SELECT "tracks".* FROM "tracks" WHERE "tracks"."album_id" = $1  [["album_id", 4]]
  Track Load (0.3ms)  SELECT "tracks".* FROM "tracks" WHERE "tracks"."album_id" = $1  [["album_id", 5]]
=> {"Lemonade"=>8, "I Am... Sasha Fierce"=>6, "Dangerously in Love"=>3, "B'Day"=>4, "4"=>1}

Artist.first.better_tracks_query
  Artist Load (0.7ms)  SELECT  "artists".* FROM "artists" ORDER BY "artists"."id" ASC LIMIT $1  [["LIMIT", 1]]
  Album Load (2.5ms)  SELECT albums.*, COUNT(*) AS tracks_count FROM "albums" INNER JOIN "tracks" ON "tracks"."album_id" = "albums"."id" WHERE "albums"."artist_id" = $1 GROUP BY albums.id  [["artist_id", 1]]
=> {"Lemonade"=>8, "I Am... Sasha Fierce"=>6, "Dangerously in Love"=>3, "B'Day"=>4, "4"=>1}
```

You can also test your method using `strict_loading`. Remember that
`strict_loading` will throw an error if you try to access an association that
has not been eagerly loaded. For instance, running

```rb
Artist.strict_loading.first.n_plus_one_tracks
```

will produce the following error:

```rb
ActiveRecord::StrictLoadingViolationError: `Artist` is marked for strict_loading. The `Album` association named `:albums` cannot be lazily loaded.
```

Running your new method with `strict_loading`, however, should work fine:

```rb
Artist.strict_loading.first.better_tracks_query
  Artist Load (0.4ms)  SELECT "artists".* FROM "artists" ORDER BY "artists"."id" ASC LIMIT $1  [["LIMIT", 1]]
  Album Load (2.7ms)  SELECT albums.*, COUNT(*) AS tracks_count FROM "albums" INNER JOIN "tracks" ON "tracks"."album_id" = "albums"."id" WHERE "albums"."artist_id" = $1 GROUP BY "albums"."id"  [["artist_id", 1]]
=> {"Lemonade"=>8, "I Am... Sasha Fierce"=>6, "Dangerously in Love"=>3, "B'Day"=>4, "4"=>1}
```

## Plants, Gardeners, and Houses

Create an array of all the seeds within a given house.

```ruby
# app/models/gardener.rb
class Gardener
  belongs_to :house,
    class_name: 'House',
    foreign_key: :house_id,
    primary_key: :id

  has_many :plants,
    class_name: 'Plant',
    foreign_key: :gardener_id,
    primary_key: :id,
    dependent: :destroy
end

# app/models/plant.rb
class Plant
  belongs_to :gardener,
    class_name: 'Gardener',
    foreign_key: :gardener_id,
    primary_key: :id

  has_many :seeds,
    class_name: 'Seed',
    foreign_key: :plant_id,
    primary_key: :id,
    dependent: :destroy
end

# app/models/seed.rb
class Seed
  belongs_to :plant,
    class_name: 'Plant',
    foreign_key: :plant_id,
    primary_key: :id
end

# app/models/house.rb
class House
  has_many :gardeners,
    class_name: 'Gardener',
    foreign_key: :house_id,
    primary_key: :id,
    dependent: :destroy

  has_many :plants,
    through: :gardeners,
    source: :plants

  def n_plus_one_seeds
    # Make sure you understand what this one line does. It uses two `has_many`
    # associations, `plants` on a `House` and `seeds` on each of the resulting
    # `Plant`s. With regard to `:seeds`, Ruby first converts the symbol to a
    # proc using `to_proc` under the hood. The `&` then block-ifies the proc
    # since `map` takes a block.
    # The line is equivalent to: `plants.map { |plant| plant.seeds }`
    plants.map(&:seeds)
  end

  def better_seeds_query
    # Your code here
  end
end
```

Check your new method in the Rails console. Don't forget to try
`House.strict_loading.first.better_seeds_query`.

## MUNI Routes, Buses, and Drivers

Create a hash with bus `id`s as keys and an array of bus drivers as the
corresponding value.

(e.g., `{'1' => ['Joan Lee', 'Charlie McDonald', 'Kevin Quashie'], '2' => ['Ed
Michaels', 'Lisa Frank', 'Sharla Alegria']}`)

```ruby
# app/models/driver.rb
class Driver
  belongs_to :bus,
    class_name: 'Bus',
    foreign_key: :bus_id,
    primary_key: :id
end

# app/models/bus.rb
class Bus
  belongs_to :route,
    class_name: 'Route',
    foreign_key: :route_id,
    primary_key: :id

  has_many :drivers,
    class_name: 'Driver',
    foreign_key: :bus_id,
    primary_key: :id,
    dependent: :destroy
end

# app/models/route.rb
class Route
  has_many :buses,
    class_name: 'Bus',
    foreign_key: :route_id,
    primary_key: :id,
    dependent: :destroy

  def n_plus_one_drivers
    all_drivers = {}
    buses.each do |bus|
      drivers = bus.drivers.map(&:name)
      all_drivers[bus.id] = drivers
    end

    all_drivers
  end

  def better_drivers_query
    # Your code here
  end
end
```

When you have finished, test your new method in the console!

## What you've learned

In this project, you've learned how to use `includes` and `joins` to avoid
inefficient N+1 queries.