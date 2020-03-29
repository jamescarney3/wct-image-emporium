require 'yaml'

ADMINS_URL = Rails.root.join '.admins.yml'
ENV_URL = Rails.root.join '.env'

def get_admins_yml
  YAML.load File.open(ADMINS_URL).read
end

def set_admins_yml(admins)
  File.write ADMINS_URL, YAML.dump(admins)
end

def get_admins_heroku
  admins_b64 = %x"heroku config:get ADMINS_B64"
  admins_b64.empty? ? [] : YAML.load(Base64.decode64(admins_b64))
end

def set_admins_heroku(admins)
  admins_b64 = Base64.encode64 YAML.dump(admins).chomp
  %x"heroku config:set ADMINS_B64=#{admins_b64}\n"
end

def set_admins_env(admins)
  env = File.open(ENV_URL).read
  admins_b64 = Base64.encode64 YAML.dump(admins)
  File.write ENV_URL, env.sub(/ADMINS_B64=(.+?)\n/, "ADMINS_B64=#{admins_b64}\n")
end


namespace :admins do

  desc 'intialize .admins.yml file'
  task :init do
    if not File.exist? '.admins.yml'
      File.write '.admins.yml', set_admins_yml([])
    end
  end

  desc 'write admin twitter uids whitelist from .admins.yml to ADMINS_B64 .env var'
  task reset: ['admins:init'] do
    admins = get_admins_yml
    set_admins_env admins
  end

  desc 'add admin twitter uid to .admins.yml and reset ADMINS_B64 .env var'
  task :add, [:uid] => ['admins:init'] do |task, args|
    admins_list = get_admins_yml

    if args[:uid] && !admins_list.include?(args[:uid].to_i)
      admins_list << args[:uid].to_i
    end

    set_admins_yml admins_list
    Rake::Task['admins:reset'].invoke
  end

  desc 'remove admin twitter uid to .admins.yml and reset ADMINS_B64 .env var'
  task :remove, [:uid] => ['admins:init'] do |task, args|
    admins_list = get_admins_yml

    admins_list.delete args[:uid].to_i

    set_admins_yml admins_list
    Rake::Task['admins:reset'].invoke
  end

  namespace :heroku do
    desc 'get base64 encoded admins yml from heroku and write it to .admins.yml and ADMINS_B64 .env var'
    task :pull do
      admins = get_admins_heroku
      set_admins_yml admins
      Rake::Task['admins:reset'].invoke
    end

    desc 'set heroku ADMINS_B64 env var to local ADMINS_B64 env var'
    task :push do
      admins = get_admins_yml
      set_admins_heroku admins
    end

  end
end
