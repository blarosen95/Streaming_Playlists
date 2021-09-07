class CreateShowSets < ActiveRecord::Migration[6.1]
  def change
    create_table :show_sets do |t|
      # t.integer :set_id
      t.references :show, null: false, foreign_key: true
      t.references :playlist_draft, null: false, foreign_key: true

      t.timestamps
    end
  end
end
