require 'yaml'

# try to read IDs from git ignored config file and set
# global constant to parsed IDs array; if anything goes
# wrong make it an empty array and we just won't be able
# to sign anyone in
begin
  ADMIN_IDS = (YAML.load File.read '.admins.yml').map(&:to_s)
rescue
  ADMIN_IDS = []
  puts <<-MESSAGE
    Please provide a whitelist of Twitter IDs to reference during
    admin level user creation in an array at the top level of:
    <root directory>/.admins.yml
  MESSAGE
end

POST_MOUNT_RESOURCE_PATHS = [
  'rails/active_storage'
]

CATCHALL_ROUTE_CONSTRAINT = lambda do |req|
  POST_MOUNT_RESOURCE_PATHS.none? do |path|
    req.path.include? path
  end
end
