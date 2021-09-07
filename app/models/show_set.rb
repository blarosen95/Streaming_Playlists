class ShowSet < ApplicationRecord
  belongs_to :show
  belongs_to :playlist_draft
end
