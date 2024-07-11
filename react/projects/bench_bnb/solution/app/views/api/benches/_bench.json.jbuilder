json.extract! bench, :id, :description, :lat, :lng, :seating, :average_rating
json.picture_url bench.picture_url || url_for(bench.photo)
