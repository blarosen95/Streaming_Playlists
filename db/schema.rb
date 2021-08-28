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

ActiveRecord::Schema.define(version: 2021_08_28_140505) do

  create_table "episode_sets", force: :cascade do |t|
    t.integer "episode_id", null: false
    t.integer "playlist_draft_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["episode_id"], name: "index_episode_sets_on_episode_id"
    t.index ["playlist_draft_id"], name: "index_episode_sets_on_playlist_draft_id"
  end

  create_table "episodes", force: :cascade do |t|
    t.integer "show_id", null: false
    t.string "name"
    t.integer "season"
    t.integer "number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["show_id"], name: "index_episodes_on_show_id"
  end

  create_table "playlist_drafts", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "show_sets", force: :cascade do |t|
    t.integer "show_id", null: false
    t.integer "playlist_draft_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["playlist_draft_id"], name: "index_show_sets_on_playlist_draft_id"
    t.index ["show_id"], name: "index_show_sets_on_show_id"
  end

  create_table "shows", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "episode_sets", "episodes"
  add_foreign_key "episode_sets", "playlist_drafts"
  add_foreign_key "episodes", "shows"
  add_foreign_key "show_sets", "playlist_drafts"
  add_foreign_key "show_sets", "shows"
end
