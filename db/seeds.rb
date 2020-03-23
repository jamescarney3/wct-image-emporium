# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'fileutils'

user_data = [
  { uid: ADMIN_IDS.empty? ? 42069 : ADMIN_IDS.first },
  { uid: ADMIN_IDS.empty? ? 666420 : ADMIN_IDS.first.to_i + 1 },
]

users = User.create user_data

hoopball_asset = { io: File.open(Rails.root.join 'test', 'fixtures', 'files', 'hoopball.jpg'), filename: 'HOOPBALL.jpg' }
terry_asset = { io: File.open(Rails.root.join 'test', 'fixtures', 'files', 'scary_terry.jpg'), filename: 'scary_terry.jpg' }
image_data = [
  { title: 'hoopball', admin: users.first, asset: hoopball_asset },
  { title: 'scary_terry', admin: users.second, asset: terry_asset },
]

images = Image.create image_data

tag_data = [
  { label: 'Erotic City', value: 'erotciccity', admin: users.second },
  { label: 'Lil Buster', value: 'lilbuster', admin: users.second },
  { label: 'Tall Tatum', value: 'talltatum', admin: users.first },
]

tags = Tag.create tag_data

images.second.tags << tags.second
