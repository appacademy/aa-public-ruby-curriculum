class SetupTables < ActiveRecord::Migration[6.1]
  def change
    create_table "mentions" do |t|
      t.integer "user_id", null: false
      t.integer "message_id", null: false
      t.boolean "read", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["user_id", "message_id"], name: "index_mentions_on_user_id_and_message_id", unique: true
    end

    create_table "messages" do |t|
      t.integer "author_id", null: false
      t.integer "room_id", null: false
      t.text "body", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["author_id"], name: "index_messages_on_author_id"
      t.index ["room_id"], name: "index_messages_on_room_id"
    end

    create_table "rooms" do |t|
      t.integer "owner_id", null: false
      t.string "name", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end

    create_table "users" do |t|
      t.string "username", null: false
      t.string "password_digest", null: false
      t.string "session_token", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["username"], name: "index_users_on_username"
      t.index ["session_token"], name: "index_users_on_session_token", unique: true
    end
  end
end
