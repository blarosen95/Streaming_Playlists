require "application_system_test_case"

class PlaylistDraftsTest < ApplicationSystemTestCase
  setup do
    @playlist_draft = playlist_drafts(:one)
  end

  test "visiting the index" do
    visit playlist_drafts_url
    assert_selector "h1", text: "Playlist Drafts"
  end

  test "creating a Playlist draft" do
    visit playlist_drafts_url
    click_on "New Playlist Draft"

    click_on "Create Playlist draft"

    assert_text "Playlist draft was successfully created"
    click_on "Back"
  end

  test "updating a Playlist draft" do
    visit playlist_drafts_url
    click_on "Edit", match: :first

    click_on "Update Playlist draft"

    assert_text "Playlist draft was successfully updated"
    click_on "Back"
  end

  test "destroying a Playlist draft" do
    visit playlist_drafts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Playlist draft was successfully destroyed"
  end
end
