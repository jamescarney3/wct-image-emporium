class Api::TagsController < ApplicationController
  # only the pure shall call the plays
  before_action :require_logged_in, only: [:create, :edit, :update, :destroy]

  # show me all the tags
  def index
  end

  # create a new tag record with parameters
  def create
  end

  # destroy a tag record
  def destroy
  end

  # fetch a tag record for updating
  def edit
  end

  # update a tag record
  def update
  end
end
