class PlaylistDraftsController < ApplicationController
  before_action :set_playlist_draft, only: %i[ show edit update destroy ]

  # GET /playlist_drafts or /playlist_drafts.json
  def index
    @playlist_drafts = PlaylistDraft.all
  end

  # GET /playlist_drafts/1 or /playlist_drafts/1.json
  def show
  end

  # GET /playlist_drafts/new
  def new
    @playlist_draft = PlaylistDraft.new
  end

  # GET /playlist_drafts/1/edit
  def edit
  end

  # POST /playlist_drafts or /playlist_drafts.json
  def create
    @playlist_draft = PlaylistDraft.new(playlist_draft_params)

    respond_to do |format|
      if @playlist_draft.save
        format.html { redirect_to @playlist_draft, notice: "Playlist draft was successfully created." }
        format.json { render :show, status: :created, location: @playlist_draft }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @playlist_draft.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /playlist_drafts/1 or /playlist_drafts/1.json
  def update
    respond_to do |format|
      if @playlist_draft.update(playlist_draft_params)
        format.html { redirect_to @playlist_draft, notice: "Playlist draft was successfully updated." }
        format.json { render :show, status: :ok, location: @playlist_draft }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @playlist_draft.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /playlist_drafts/1 or /playlist_drafts/1.json
  def destroy
    @playlist_draft.destroy
    respond_to do |format|
      format.html { redirect_to playlist_drafts_url, notice: "Playlist draft was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playlist_draft
      @playlist_draft = PlaylistDraft.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def playlist_draft_params
      params.fetch(:playlist_draft, {})
    end
end
