class Api::TagsController < ApplicationController
  # only the pure shall call the plays
  before_action :require_logged_in, only: [:create, :edit, :update, :destroy]

  # show me all the tags
  def index
    render json: Tag.all.map(&helpers.method(:filter_tag_attrs))
  end

  # create a new tag record with parameters
  def create
    @tag = Tag.new(tag_params)
    @tag.admin = current_user
    if @tag.save
      render json: helpers.filter_tag_attrs(@tag), status: 200
    elsif @tag.errors.messages[:value].include? 'has already been taken' # there's probably a better way to do this
      render json: { error: '409 conflict, duplicate record' }, status: 409
    else
      render json: { error: '422 unprocessable entity' }, status: 422
    end
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

  private

    def tag_params
      params.require(:tag).permit(:label, :value)
    end
end
