# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_16_020625) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actors", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_actors_on_name"
  end

  create_table "castings", force: :cascade do |t|
    t.bigint "actor_id", null: false
    t.bigint "movie_id", null: false
    t.integer "ord", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["actor_id", "movie_id"], name: "index_castings_on_actor_id_and_movie_id", unique: true
    t.index ["movie_id"], name: "index_castings_on_movie_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "title", null: false
    t.integer "yr", null: false
    t.float "score", null: false
    t.integer "votes", null: false
    t.bigint "director_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["director_id"], name: "index_movies_on_director_id"
    t.index ["title"], name: "index_movies_on_title"
  end

  add_foreign_key "castings", "actors"
  add_foreign_key "castings", "movies"
  add_foreign_key "movies", "actors", column: "director_id"
end