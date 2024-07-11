@rooms.each do |room|
  json.rooms do
    json.set! room.id do
      json.partial! 'api/rooms/room', room: room
    end
  end

  json.users do
    json.set! room.owner.id do
      json.partial! 'api/users/user', user: room.owner
    end
  end
end