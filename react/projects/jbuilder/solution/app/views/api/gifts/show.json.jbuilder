# json.extract! @gift, :title, :description

# with partial
json.partial! 'api/gifts/gift', gift: @gift
