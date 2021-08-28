class EpisodeSet < ApplicationRecord
  belongs_to :episode
  belongs_to :playlist_draft
end
