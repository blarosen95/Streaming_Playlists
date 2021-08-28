class CreatePlaylistDrafts < ActiveRecord::Migration[6.1]
  def change
    create_table :playlist_drafts do |t|
      t.string :title
      # t.integer :show_set_id, foreign_key: true
      # t.integer :episode_set_id, foreign_key: true

      t.timestamps
    end
  end
end
