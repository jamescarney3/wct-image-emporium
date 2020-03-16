Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  # the non-sessions routes in this namespace follow the conventions specified
  # in the default configs of the omniauth gem/middleware. sessions routes are
  # specified here for organizational reasons and provisionally deal with token
  # management
  namespace :auth do
    resource :sessions, only: [:show, :destroy], defaults: { format: :json }
    get ':provider/callback', to: 'sessions#create', as: :callback
    get 'failure', to: 'static_pages#root', as: :failure
  end

  namespace :api, defaults: { format: :json } do
    resources :images, only: [:show, :create]
    resources :tags, only: [:index, :create, :destroy, :edit, :update]
  end

  # the following routes are intended specified to serve as redirect targets
  # and correspond to paths intended to have semantic meanings in the client
  # side router
  get 'unauthorized', to: 'static_pages#root', as: :unauthorized
  get 'admin', to: 'static_pages#root', as: :admin

  get '*path', to: 'static_pages#root'
end
