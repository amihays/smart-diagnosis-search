Rails.application.routes.draw do
  root 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :diagnoses, only: [:index]
    resources :diagnosis_selections, only: [:create, :index]
    resources :queries, only: [:create, :index]
  end
end
