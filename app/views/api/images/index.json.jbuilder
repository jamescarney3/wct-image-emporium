json.array! @images do |image|
  json.partial! 'api/images/image', image: image

  json.url image.asset.attached? ? rails_blob_url(image.asset) : nil
  json.tag_ids image.tag_ids
  json.tags image.tags do |tag|
    json.partial! 'api/tags/tag', tag: tag
  end
  json.user do
    json.screen_name "@#{image.admin.screen_name}"
    json.url "http://twitter.com/#{image.admin.screen_name}"
  end
end
