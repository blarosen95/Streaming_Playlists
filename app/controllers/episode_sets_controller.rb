# frozen_string_literal: true

class EpisodeSetsController < ApplicationController
  before_action :set_episode_set, only: %i[show edit update destroy]

  def index
    @episode_sets = EpisodeSet.all
  end

  def show; end

  def new
    @episode_set = EpisodeSet.new
  end

  def edit; end

  def create
    @episode_set = EpisodeSet.new(episode_set_params)

    respond_to do |f|
      if @episode_set.save
        f.html { redirect_to @episode_set, notice: 'Episode Set was successfully created.' }
        f.json { render :show, status: :created, location: @episode_set }
      else
        f.html { render :new, status: :unprocessable_entity }
        f.json { render json: @episode_set.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |f|
      if @episode_set.update(episode_set_params)
        f.html { redirect_to @episode_set, notice: 'Episode Set was successfully updated.' }
        f.json { render :show, status: :ok, location: @episode_set }
      else
        f.html { render :edit, status: :unprocessable_entity }
        f.json { render json: @episode_set.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @episode_set.destroy
    respond_to do |f|
      f.html { redirect_to episode_sets_url, notice: 'Episode Set was successfully deleted.' }
      f.json { head :no_content }
    end
  end

  private

  def set_episode_set
    @episode_set = EpisodeSet.find(params[:id])
  end

  def episode_set_params
    params.fetch(:episode_set, {}) #  TODO: fill me out properly later on
  end
end
