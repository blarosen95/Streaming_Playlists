class PlaylistDraft < ApplicationRecord
  # belongs_to :show_set_id, :foreign_key => 'show_set_id', :class_name => 'ShowSet', :primary_key => 'set_id'
  # belongs_to :episode_set_id, :foreign_key => 'episode_set_id', :class_name => 'EpisodeSet', :primary_key => 'set_id'
  has_many :show_set
  accepts_nested_attributes_for :show_set
  validates_associated :show_set
  has_many :episode_set
  accepts_nested_attributes_for :episode_set
  validates_associated :episode_set
end
