# Parental v 0.1.0 -- Parental is a task helper for parents/caregivers

## Functionality:
### Create Parent account, login and sign out (including with Facebook authentication)
### Create TODO List
### Each TODO List can have many Tasks
### Can share TODO list via email. social media
### Can mark whole TODO list & individual Tasks as Done

# DONE
# Models:
## Parent:
### Parents have many todo lists through tasks
### Parents have many todos
### Parents have many tasks
## Todo:
### Todos belong to a parent through tasks
### Todos have_many tasks
## Task:
### Task belong to a parent through tasks
## Tasks belong to a todo

# DONE
# Migrations:
# Parents:
## name:string
## email:string
## password_digest:string

# Todos:
## title:string
## description:text
## done:boolean
## parent_id:integer

# Tasks:
## title:string
## description:text
## done:boolean
## todo_id:integer
## parent_id:integer

# DONE ROUTES
# Controllers & Routes:

## RegistrationsController
### Sign Up (DONE)

## SessionsController
### Login (DONE)
### Logout (DONE)

## TodosController
### Add Todos & Tasks
### View Individual Todos
### Delete Tasks & Todos
### Update Tasks & Todos

## ParentsController
### View/Update Profile
#### Change password
#### Link to Todos
