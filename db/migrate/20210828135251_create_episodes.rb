class CreateEpisodes < ActiveRecord::Migration[6.1]
  def change
    create_table :episodes do |t|
      t.references :show, null: false, foreign_key: true
      t.string :name
      t.integer :season
      t.integer :number

      t.timestamps
    end
  end
end
