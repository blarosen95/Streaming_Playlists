class CreatePlaylistDrafts < ActiveRecord::Migration[6.1]
  def change
    create_table :playlist_drafts do |t|

      t.timestamps
    end
  end
end
