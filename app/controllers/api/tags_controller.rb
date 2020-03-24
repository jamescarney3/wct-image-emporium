class Api::TagsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  # only the pure shall call the plays
  before_action :require_logged_in, only: [:create, :edit, :update, :destroy]

  # show me all the tags
  def index
    @tags = Tag.all
    render :index, status: 200
  end

  # create a new tag record with parameters
  def create
    @tag = Tag.new tag_params
    @tag.admin = current_user
    if @tag.save
      render :show, status: 200
    elsif @tag.errors.messages[:value].include? 'has already been taken' # there's probably a better way to do this
      render json: { error: '409 conflict with existing record' }, status: 409
    else
      render json: { error: '422 unprocessable entity' }, status: 422
    end
  end

  # destroy a tag record
  def destroy
    @tag = Tag.find params[:id]

    if !@tag.admin.nil? && @tag.admin != current_user
      render json: { error: '403 requested operation not permitted' }, status: 403
    elsif @tag.delete
      render :show, status: 200
    else
      render json: { error: '400 bad request' }, status: 400
    end
  end

  # fetch a tag record for updating
  def edit
    @tag = Tag.find params[:id]
    if !@tag.admin.nil? && @tag.admin != current_user
      render json: { error: '403 requested operation not permitted' }, status: 403
    else
      render :show, status: 200
    end
  end

  # update a tag record
  def update
    @tag = Tag.find params[:id]
    if !@tag.admin.nil? && @tag.admin != current_user
      render json: { error: '403 requested operation not permitted' }, status: 403
    elsif @tag.update tag_params
      render :show, status: 200
    else
      render json: { error: '422 unprocessable entity' }, status: 422
    end
  end

  private

    def tag_params
      params.require(:tag).permit(:label, :value)
    end

    def record_not_found
      render json: { errors: '404 tag record not found' }, status: 404
    end
end
