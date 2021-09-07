Rails.application.routes.draw do
  resources :playlist_drafts
  resources :show_sets
  resources :episode_sets
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
