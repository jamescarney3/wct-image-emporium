json.array! @images do |image|
  json.partial! 'api/images/image', image: image

  json.url image.asset.attached? ? rails_blob_url(image.asset) : nil
end