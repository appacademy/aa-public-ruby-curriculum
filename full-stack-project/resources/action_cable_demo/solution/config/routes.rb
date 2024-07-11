Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/:path', to: 'static_pages#root', constraints: { path: /(?!api).*/ }

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create] do
      collection do
        post 'login'
        delete 'logout'
      end
    end
    
    resources :mentions, only: [:index] do
      patch 'read', on: :member
    end

    resources :rooms, only: [:index, :show, :create, :destroy]
    resources :messages, only: [:create, :destroy]
  end
end