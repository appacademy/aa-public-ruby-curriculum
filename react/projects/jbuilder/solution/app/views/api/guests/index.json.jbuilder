json.array! @guests do |guest|
  next if guest.age < 40 || guest.age > 50
  # json.extract! guest, :name, :age, :favorite_color

  # with partial
  json.partial! 'api/guests/guest', guest: guest
end
