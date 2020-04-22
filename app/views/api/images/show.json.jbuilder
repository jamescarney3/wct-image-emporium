json.partial! 'api/images/image', image: @image

json.url @image.asset.attached? ? rails_blob_url(@image.asset) : nil
json.tag_ids @image.tag_ids
json.user_id @image.user_id

json.tags @image.tags do |tag|
  json.partial! 'api/tags/tag', tag: tag
end

json.user do
  json.id @image.admin.id
  json.screen_name "@#{@image.admin.screen_name}"
  json.url "http://twitter.com/#{@image.admin.screen_name}"
end
