json.room do
  json.partial! 'api/rooms/room', room: @room
end

@room.messages.each do |message|
  json.messages do
    json.set! message.id do
      json.partial! 'api/messages/message', message: message
    end
  end

  json.users do
    json.set! message.author.id do
      json.partial! 'api/users/user', user: message.author
    end
  end
end

json.online_users do
  @online_users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end