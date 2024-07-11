@mentions.each do |mention|
  json.mentions do
    json.set! mention.id do
      json.partial! 'api/mentions/mention', mention: mention
    end
  end

  json.messages do
    json.set! mention.message.id do
      json.partial! 'api/messages/message', message: mention.message
    end
  end

  json.users do
    json.set! mention.message.author.id do
      json.partial! 'api/users/user', user: mention.message.author
    end
  end
end