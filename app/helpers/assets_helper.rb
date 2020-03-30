module AssetsHelper
  def get_bundle_asset_location
    if ENV['USE_WEBPACK_DEV_SERVER'].present?
      "http://localhost:13666/dist/bundle.js"
    elsif ENV['PRECOMPILED_ASSETS'].present? || ENV['RAILS_ENV'] == 'production'
      'bundle'
    else
      "http://localhost:13666/dist/bundle.js"
    end
  end
end
