Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "bands#index"

  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:index, :show, :new, :create] do
    get :activate, on: :collection
    post :toggle_admin, on: :member
  end

  resources :bands do
    resources :albums, only: [:new]
  end

  resources :albums, only: [:show, :create, :edit, :update, :destroy] do
    resources :tracks, only: [:new]
  end

  resources :tracks, only: [:show, :create, :edit, :update, :destroy]

  resources :notes, only: [:create, :destroy]
end