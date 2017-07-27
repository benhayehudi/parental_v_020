Rails.application.routes.draw do
  root 'sessions#new'
  resources :registrations, only: [:new, :create]
  post '/registrations/new' => 'registrations#create'
  get '/logout' => 'sessions#destroy'

  resources :sessions, only: [:new, :create, :destroy]
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/auth/facebook/callback' => 'registrations#facebook'

  resources :parents, only: [:index, :update] do
    resources :todos, only: [:index, :new, :create, :show, :destroy, :update]
  end

  resources :todos, only: [:index, :new, :create, :show, :destroy, :update] do
    resources :tasks, only: [:new, :create, :destroy, :update]
  end
  post '/todos/new' => 'todos#create'
  post '/todos/:id/tasks/:id' => 'tasks#update'
end
