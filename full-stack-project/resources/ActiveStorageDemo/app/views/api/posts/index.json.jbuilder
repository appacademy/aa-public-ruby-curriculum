json.array! @posts do |post|
  json.extract! post, :id, :title
  json.photoUrl url_for(post.photo)
end
