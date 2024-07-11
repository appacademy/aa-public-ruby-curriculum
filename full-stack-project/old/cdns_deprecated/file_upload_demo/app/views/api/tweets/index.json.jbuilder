json.array! @tweets do |tweet|
  json.partial! "tweet", tweet: tweet
end
