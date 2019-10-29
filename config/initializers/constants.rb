require 'yaml'

# declare global var to store admin user Twitter IDs
ADMIN_IDS = []

# try to read IDs from git ignored config file and set
# var to parsed IDs array
begin
  ADMIN_IDS = YAML.load File.read '.admins.yml'
rescue
  puts <<-MESSAGE
    Please provide a whitelist of Twitter IDs to reference during
    admin level user creation in an array at the top level of:
    <root directory>/.admins.yml
  MESSAGE
end
