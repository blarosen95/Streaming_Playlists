require "test_helper"

class PlaylistDraftsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @playlist_draft = playlist_drafts(:one)
  end

  test "should get index" do
    get playlist_drafts_url
    assert_response :success
  end

  test "should get new" do
    get new_playlist_draft_url
    assert_response :success
  end

  test "should create playlist_draft" do
    assert_difference('PlaylistDraft.count') do
      post playlist_drafts_url, params: { playlist_draft: {  } }
    end

    assert_redirected_to playlist_draft_url(PlaylistDraft.last)
  end

  test "should show playlist_draft" do
    get playlist_draft_url(@playlist_draft)
    assert_response :success
  end

  test "should get edit" do
    get edit_playlist_draft_url(@playlist_draft)
    assert_response :success
  end

  test "should update playlist_draft" do
    patch playlist_draft_url(@playlist_draft), params: { playlist_draft: {  } }
    assert_redirected_to playlist_draft_url(@playlist_draft)
  end

  test "should destroy playlist_draft" do
    assert_difference('PlaylistDraft.count', -1) do
      delete playlist_draft_url(@playlist_draft)
    end

    assert_redirected_to playlist_drafts_url
  end
end
