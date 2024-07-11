json.mention do
  json.partial! 'api/mentions/mention', mention: mention
end

json.message do
  json.partial! 'api/messages/message', message: mention.message
end

json.user do
  json.partial! 'api/users/user', user: mention.message.author
end