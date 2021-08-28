# frozen_string_literal: true

class ShowSetsController < ApplicationController
  before_action :set_show_set, only: %i[show edit update destroy]

  def index
    @show_sets = ShowSet.all
  end

  def show; end

  def new
    @show_set = ShowSet.new
  end

  def edit; end

  def create
    @show_set = ShowSet.new(show_set_params)

    respond_to do |format|
      if @show_set.save
        format.html { redirect_to @show_set, notice: 'Show Set was successfully created.' }
        format.json { render :show, status: :created, location: @show_set }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @show_set.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @show_set.update(show_set_params)
        format.html { redirect_to @show_set, notice: 'Show Set was successfully updated.' }
        format.json { render :show, status: :ok, location: @show_set }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @show_set.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @show_set.destroy
    respond_to do |format|
      format.html { redirect_to show_sets_url, notice: 'Show Set was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private

  def set_show_set
    @show_set = ShowSet.find(params[:id]) #  TODO we likely want the other id here
  end

  #  TODO: We will want to actually fill this out eventually.
  def show_set_params
    params.fetch(:show_set, {})
  end
end
